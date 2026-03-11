import stripe
import logging
from datetime import datetime, timezone
from fastapi import Depends, HTTPException, status
import app.db.crud as crud
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.models import User, UserSubscription, Plan
from app.core.security import get_current_user

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)
logger = logging.getLogger(__name__)

async def create_checkout_session(plan_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    logger.info("Checkout session creation hit")
    plan = crud.create_checkout_session(db, plan_id)
    if not plan:
        raise HTTPException(status_code=400, detail="Plan could not go through")
    
    if not current_user.stripe_customer_id:
        customer = stripe.Customer.create(
            email=current_user.email,
        )
        current_user.stripe_customer_id=customer.id
        db.commit()

    session = stripe.checkout.Session.create(
        customer=current_user.stripe_customer_id,
        payment_method_types=["card"],
        mode="subscription",
        client_reference_id=str(current_user.id),
        metadata={
            "user_id": current_user.id,
            "plan_id": plan.id,
        },
        line_items=[{
            "price": plan.stripe_price_id,
            "quantity": 1,
        }],
        subscription_data={
            "metadata": {
                "user_id": current_user.id,
                "plan_id": plan.id,
            }
        },
        success_url="http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}",
        cancel_url="http://localhost:3000/cancel",
    )

    return {"checkout_url": session.url}

async def handle_user_subscription(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    subscription = (
        db.query(UserSubscription).filter(
            UserSubscription.user_id == current_user.id,
            UserSubscription.status == "active"
        ).first() # TODO - return all active subscriptions (test feature)
    )

    if not subscription:
        raise HTTPException(status_code=404, detail="No subscriptions found for user")
    
    user_subscription = {
        "id": subscription.id,
        "user_id": current_user.id,
        "plan_id": subscription.plan_id,
        "price": subscription.plan.price, # not plan.price
        "stripe_subscription_id": subscription.stripe_subscription_id,
        "status": subscription.status,
        "current_period_start": subscription.current_period_start,
        "current_period_end": subscription.current_period_end
    }

    return user_subscription

# Cancel user subscription call to Stripe (not deleting from db)
async def handle_cancel_user_subscription(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    logger.info(f"Current user id: {current_user.id} ({type(current_user.id)})")
    
    subscription = db.query(UserSubscription).filter(
        UserSubscription.user_id == current_user.id,
        UserSubscription.status == "active"
    ).first()

    if not subscription:
        logger.warning(f"No active subscription found")
        raise HTTPException(status_code=404, detail="No active subscription")
    
    try:
        stripe.Subscription.cancel(subscription.stripe_subscription_id, cancel_at_period_end=True)
        subscription.status = "canceled"
        db.commit()

        return {"status": "canceled"}
    
    except stripe.error.StripeError as e:
        raise HTTPException(status_code=400, detail=str(e))

# Webhook event - customer subscription created
async def customer_subscription_created(subscription_data: dict, db: Session):
    logger.info(f"Checking data info: {subscription_data}")
    stripe_subscription_id = subscription_data["id"]

    if not stripe_subscription_id:
        raise HTTPException(status_code=400, detail="No subscription ID")

    user_id = subscription_data["metadata"].get("user_id")
    plan_id = subscription_data["metadata"].get("plan_id")

    logger.info(f"Current user id: {user_id}, ({type(user_id)}), current plan id: {plan_id}, ({type(plan_id)})")

    item = subscription_data["items"]["data"][0]
    
    current_period_start_ts = item.get("current_period_start")
    current_period_end_ts = item.get("current_period_end")

    current_period_start = (
        datetime.fromtimestamp(current_period_start_ts, tz=timezone.utc)
        if current_period_start_ts is not None else None
    )

    current_period_end = (
        datetime.fromtimestamp(current_period_end_ts, tz=timezone.utc)
        if current_period_end_ts is not None else None
    )

    new_purchase = UserSubscription(
        user_id=user_id,
        plan_id=plan_id,
        stripe_subscription_id=stripe_subscription_id,
        status=subscription_data["status"],
        current_period_start=current_period_start,
        current_period_end=current_period_end,
    )

    try:
        db.add(new_purchase)
        db.commit() # Create UserSubscription in DB
        db.refresh(new_purchase)

        return {"status": "success"}
    except Exception as e:
        logger.error(f"Failed to commit subscription to DB: {e}")
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Failed to commit subscription to DB")

# Webhook event - customer subscription updated
async def customer_subscription_updated(subscription: dict, db: Session = Depends(get_db)):
    stripe_subscription_id = subscription["id"]

    if not stripe_subscription_id:
        raise HTTPException(status_code=400, detail="No subscription ID")

    existing = db.query(UserSubscription).filter(
        UserSubscription.stripe_subscription_id == stripe_subscription_id
    ).first()

    if not existing:
        logger.warning(f"No subscription found for {stripe_subscription_id}")
        return {"status": "not_found"}
    
     # Get price from the first subscription item
    price_id = subscription["items"]["data"][0]["price"]["id"]

    # Map Stripe price → internal plan
    plan = db.query(Plan).filter(Plan.stripe_price_id == price_id).first()

    if plan:
        existing.plan_id = plan.id

    current_period_start_ts = subscription.get("current_period_start")
    current_period_end_ts = subscription.get("current_period_end")

    current_period_start = (
        datetime.fromtimestamp(current_period_start_ts, tz=datetime.timezone.utc)
        if current_period_start_ts is not None else None
    )

    current_period_end = (
        datetime.fromtimestamp(current_period_end_ts, tz=datetime.timezone.utc)
        if current_period_end_ts is not None else None
    )# TODO - calculate end of period based on subscription plan (duration)

    existing.plan_id = plan.id
    existing.status = subscription.get("status")
    existing.current_period_start = current_period_start
    existing.current_period_end = current_period_end

    db.commit()
    db.refresh(existing)

    return {"status": "updated"}

# Webhook event - customer subscription deleted
async def customer_subscription_deleted(subscription: dict, db: Session = Depends(get_db)):
    stripe_subscription_id = subscription["id"]

    if not stripe_subscription_id:
        raise HTTPException(status_code=400, detail="No subscription ID")

    existing = db.query(UserSubscription).filter(
        UserSubscription.stripe_subscription_id == stripe_subscription_id
    ).first()

    if not existing:
        logger.warning(f"No subscription found for {stripe_subscription_id}")
        return {"status": "not_found"}

    existing.status = "canceled"

    db.commit()

    return {"status": "canceled"}