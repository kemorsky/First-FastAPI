import stripe
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, status, Request, Header
import app.db.crud as crud
from app.schemas.schemas import PlanResponse, UserSubscriptionResponse, CheckoutSessionResponse
from app.utils.config import Settings
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.models import User, UserSubscription
from app.core.security import get_current_user

async def create_checkout_session(plan_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
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
        line_items=[{
            "price": plan.stripe_price_id,
            "quantity": 1,
        }],
        metadata={
            "user_id": str(current_user.id),
            "plan_id": str(plan.id),
        },
        success_url="http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}",
        cancel_url="http://localhost:3000/cancel",
        subscription_data={
            "metadata": {
                "user_id": str(current_user.id),
                "plan_id": str(plan.id),
            }
        }
    )

    return {"checkout_url": session.url}

async def handle_user_subscription(current_user: User = Depends(get_current_user)):
    subscription = current_user.purchases[-1] if current_user.purchases else None # TODO - refactor logic so that it shows by active subscription

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

# Webhook event - customer subscription created
async def customer_subscription_created(subscription_data: dict, db: Session = Depends(get_db)):
    stripe_subscription_id = subscription_data["id"]

    if not stripe_subscription_id:
        raise HTTPException(status_code=400, detail="No subscription ID")
    
    # Retrieve the full subscription object from Stripe
    subscription = stripe.Subscription.retrieve(stripe_subscription_id)

    user_id = subscription["metadata"].get("user_id")
    plan_id = subscription["metadata"].get("plan_id")

    existing = db.query(UserSubscription).filter(
        UserSubscription.user_id == user_id,
        UserSubscription.plan_id == plan_id,
        UserSubscription.status != "canceled"
    ).first()

    if existing:
        print(f"Subscription already exists for user {user_id} and plan {plan_id}")
        return {"status": "subscription already exists"}

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

    new_purchase = UserSubscription(
        user_id=int(user_id),
        plan_id=int(plan_id),
        stripe_subscription_id=stripe_subscription_id,
        status=subscription.get("status"),
        current_period_start=current_period_start,
        current_period_end=current_period_end,
    )

    db.add(new_purchase)
    db.commit() # Create UserSubscription in DB
    db.refresh(new_purchase)

    return {"status": "success"}