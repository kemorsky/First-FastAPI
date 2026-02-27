import stripe
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, status, Request, Header
import app.db.crud as crud
import app.schemas.schemas as schemas
from app.utils.config import Settings
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.models import User, UserSubscription
from app.core.security import get_current_user

router = APIRouter(prefix="/api/payments", tags=["payments"])

settings = Settings()
stripe.api_key = settings.STRIPE_SECRET_KEY

@router.get("/get-products", response_model=list[schemas.PlanResponse])
async def get_products(db: Session = Depends(get_db)):
    return crud.get_products(db)

@router.get("/get-user-subscription", response_model=list[schemas.UserSubscriptionResponse])
async def get_user_subscription(plan_id: int, current_user: User = Depends(get_current_user)):
    return crud.get_user_subscription(plan_id, current_user) 
    # TODO - fix missing logic behind obtaining the user subscription

@router.get("/get-plans", response_model=list[schemas.PlanResponse])
async def get_plans(db: Session = Depends(get_db)):
    return crud.get_plans(db)

@router.post("/create-checkout-session", response_model=schemas.CheckoutSessionResponse, status_code=status.HTTP_201_CREATED)
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
        success_url="http://localhost:3000/success",
        cancel_url="http://localhost:3000/cancel",
    )

    return {"checkout_url": session.url}

@router.post("/webhook")
async def stripe_webhook(request: Request, stripe_signature: str = Header(None), db: Session = Depends(get_db)):

    payload = await request.body()

    event = stripe.Webhook.construct_event(
        payload,
        stripe_signature, # TODO finish setup as the webhook is never actually hit
        settings.STRIPE_WEBHOOK_SECRET
    )

    if event["type"] == "checkout.session.completed":
        session = event["data"]["object"]

        user_id = session["metadata"]["user_id"]
        plan_id = session["metadata"]["plan_id"]
        stripe_subscription_id = session["subscription"]

        subscription = stripe.Subscription.retrieve(stripe_subscription_id)

        new_purchase = UserSubscription(
            user_id=int(user_id),
            plan_id=int(plan_id),
            stripe_subscription_id=stripe_subscription_id,
            status=subscription.status,
            current_period_start=datetime.fromtimestamp(subscription.current_period_start),
            current_period_end=datetime.fromtimestamp(subscription.current_period_end),
        )

        db.add(new_purchase)
        db.commit() # Create UserSubscription in DB
        db.refresh(new_purchase)

    if event["type"] == "customer.subscription.deleted":
        subscription_data = event["data"]["object"]
        stripe_subscription_id = subscription_data["id"]

        purchase = db.query(UserSubscription).filter(
            UserSubscription.stripe_subscription_id == stripe_subscription_id
        ).first()

        if purchase:
            purchase.status = "canceled"
            db.commit()

    return {"status": "success"}