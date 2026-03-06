import stripe
import logging
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

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)
logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/payments", tags=["payments"])

settings = Settings()
stripe.api_key = settings.STRIPE_SECRET_KEY

@router.get("/get-user-subscription", response_model=UserSubscriptionResponse)
async def get_user_subscription(current_user: User = Depends(get_current_user)):
    try:
        return await handle_user_subscription(current_user)
    except stripe.error.StripeError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/get-plans", response_model=list[PlanResponse])
async def get_plans(db: Session = Depends(get_db)):
    return crud.get_plans(db)

@router.post("/create-checkout-session", response_model=CheckoutSessionResponse, status_code=status.HTTP_201_CREATED)
async def create_checkout_session_route(plan_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    try:
        return await create_checkout_session(plan_id, current_user, db) # /api/payments/create-checkout-session?plan_id=2 - example query
    except stripe.error.StripeError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

@router.post("/webhook")
async def stripe_webhook(request: Request, stripe_signature: str = Header(None), db: Session = Depends(get_db)):
    payload = await request.body()

    logger.info(f"Received webhook payload: {payload}")

    try:
        event = stripe.Webhook.construct_event(
            payload,
            stripe_signature,
            settings.STRIPE_WEBHOOK_SECRET
        )
        logger.info(f'Sending event info: {event["type"]}')
    except ValueError:
        logger.error("Invalid webhook payload")
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid payload")
    except stripe.error.SignatureVerificationError:
        logger.error("Invalid webhook signature")
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid signature")
    
    try:
        if event["type"] == "checkout.session.completed":
            session = event["data"]["object"]
            stripe_subscription_id = session["subscription"]
            subscription = stripe.Subscription.retrieve(stripe_subscription_id)
            await customer_subscription_created(subscription, db)
            logger.info(f"Sending event info: {session}")
        # elif event["type" == "customer.subscription.updated"]:
        #     await customer_subscription_updated(event["data"]["object"], db)
        # elif event["type" == "customer.subscription.deleted"]:
        #     abc

        return {"status": "success"}
    except Exception as e:
        logger.error(f"Error processing webhook: {e}")
        raise HTTPException(status_code=500, detail="Error processing webhook")