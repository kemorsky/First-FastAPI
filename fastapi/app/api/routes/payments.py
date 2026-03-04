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
from app.services.services_payments import create_checkout_session, customer_subscription_created, handle_user_subscription

router = APIRouter(prefix="/api/payments", tags=["payments"])

settings = Settings()
stripe.api_key = settings.STRIPE_SECRET_KEY

@router.get("/get-user-subscription", response_model=UserSubscriptionResponse)
async def get_user_subscription(current_user: User = Depends(get_current_user)):
    return await handle_user_subscription(current_user)

@router.get("/get-plans", response_model=list[PlanResponse])
async def get_plans(db: Session = Depends(get_db)):
    return crud.get_plans(db)

@router.post("/create-checkout-session", response_model=CheckoutSessionResponse, status_code=status.HTTP_201_CREATED)
async def create_checkout_session_route(plan_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return await create_checkout_session(plan_id, current_user, db) # /api/payments/create-checkout-session?plan_id=2 - example query

@router.post("/webhook")
async def stripe_webhook(request: Request, stripe_signature: str = Header(None), db: Session = Depends(get_db)):

    payload = await request.body()

    event = stripe.Webhook.construct_event(
        payload,
        stripe_signature,
        settings.STRIPE_WEBHOOK_SECRET
    )

    if event["type"] == "customer.subscription.created":
        await customer_subscription_created(event["data"]["object"], db)
    # elif event["type" == "customer.subscription.updated"]:
    #     abc
    # elif event["type" == "customer.subscription.deleted"]:
    #     abc