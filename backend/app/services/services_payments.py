import stripe
import logging
from datetime import datetime, timezone
from fastapi import Depends, HTTPException, status
import app.db.crud as crud
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.models import User, UserSubscription, Plan
from app.core.security import get_current_user
from app.utils.config import settings

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

    existing = db.query(UserSubscription).filter(
        UserSubscription.user_id == current_user.id,
        UserSubscription.plan_id == plan.id,
        UserSubscription.status == "active"
    ).first()

    if existing: # check whether user is subscribed to the plan via its id. If yes, prevent checkout link from being formed
        logger.warning(f"Subscription already exists for user {current_user.id} and plan {plan_id}")
        raise HTTPException(status_code=400, detail="User already has this plan")
    
    if not current_user.stripe_customer_id:
        customer = stripe.Customer.create(
            email=current_user.email,
        )
        current_user.stripe_customer_id=customer.id
        db.commit()
    
    try: # if not, create checkout session and move on with the payment process
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
            success_url=settings.FRONTEND_SUCCESS_URI + "?session_id={CHECKOUT_SESSION_ID}",
            cancel_url=settings.FRONTEND_CANCEL_URI,
        )

        return {"checkout_url": session.url}
    except stripe.error.StripeError as e:
        raise HTTPException(status_code=400, detail=str(e))

# Show user's active subscription without fetching the whole user like in api/auth/users/me
async def handle_user_subscription(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    subscription = (
        db.query(UserSubscription).filter(
            UserSubscription.user_id == current_user.id,
            UserSubscription.status == "active"
        ).first() # TODO - return all active subscriptions (test feature)
    )

    logger.info(f"Checking data info: {subscription}")

    if not subscription:
        logger.warning(f"No active subscription has been found");
        raise HTTPException(status_code=404, detail="No subscriptions found for user")
    
    if subscription.current_period_end < datetime.now(timezone.utc):
        subscription.status = "canceled"
        db.commit()
    
    try:
        user_subscription = {
            "id": subscription.id,
            "user_id": current_user.id,
            "plan_id": subscription.plan_id,
            "price": subscription.plan.price, # not plan.price
            "stripe_subscription_id": subscription.stripe_subscription_id,
            "status": subscription.status,
            "cancel_at_period_end": subscription.cancel_at_period_end,
            "current_period_start": subscription.current_period_start,
            "current_period_end": subscription.current_period_end,
            "plan": subscription.plan
        }

        return user_subscription
    
    except Exception as e:
        logger.error(f"Failed to retrieve user's subscription: {e}")
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str("Failed to retrieve user's subscription"))

# Cancel user subscription call to Stripe (not deleting from db)
async def handle_cancel_user_subscription(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    logger.info(f"Current user id: {current_user.id} ({type(current_user.id)})")
    
    subscription = db.query(UserSubscription).filter(
        UserSubscription.user_id == current_user.id,
        UserSubscription.status == "active",
        UserSubscription.cancel_at_period_end == False
    ).first()

    if not subscription:
        logger.warning(f"No active subscription found")
        raise HTTPException(status_code=404, detail="No active subscription")
    
    try:
        stripe.Subscription.modify(subscription.stripe_subscription_id, cancel_at_period_end=True)
        subscription.status = "canceled"
        subscription.cancel_at_period_end = True
        db.commit()

        return {
            subscription.status: "canceled",
            subscription.cancel_at_period_end: True
        }
    
    except Exception as e:
        logger.error(f"Failed to cancel user's subscription: {e}")
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str("Failed to cancel user's subscription"))

# Webhook event - customer subscription created
async def customer_subscription_created(subscription: dict, db: Session):
    logger.info(f"Checking data info: {subscription}")
    
    stripe_subscription_id = subscription["id"]

    if not stripe_subscription_id:
        raise HTTPException(status_code=400, detail="No subscription ID")

    user_id = subscription["metadata"].get("user_id")
    plan_id = subscription["metadata"].get("plan_id")

    logger.info(f"Current user id: {user_id}, ({type(user_id)}), current plan id: {plan_id}, ({type(plan_id)})")

    item = subscription["items"]["data"][0]
    
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
        status=subscription["status"],
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

    item = subscription["items"]["data"][0]

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