from fastapi import APIRouter, Depends, HTTPException, status
import app.db.crud as crud
import app.schemas.schemas as schemas
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.models import User

router = APIRouter(prefix="/api/subscriptions", tags=["subscriptions"])

@router.get("/", response_model=list[schemas.SubscriptionResponse])
async def get_subscriptions(db: Session = Depends(get_db)):
    return crud.get_subscriptions(db)

@router.post("/", response_model=schemas.SubscriptionResponse, status_code=status.HTTP_201_CREATED)
async def create_subscription(subscription: schemas.SubscriptionCreate, db: Session = Depends(get_db)):
    subscription = crud.create_subscription(db, subscription)
    if not subscription:
        raise HTTPException(status_code=400, detail="Subscription not created")
    return subscription

@router.post("/purchase", response_model=schemas.UserSubscriptionResponse, status_code=status.HTTP_201_CREATED)
async def create_purchase(purchase: schemas.UserSubscriptionCreate, db: Session = Depends(get_db)):
    purchase = crud.create_purchase(db, purchase)
    if not purchase:
        raise HTTPException(status_code=400, detail="Purchase could not go through")
    return purchase

@router.delete("/{subscription_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_subscription(subscription_id: int, db: Session = Depends(get_db)):
    subscription = crud.delete_subscription(db, subscription_id)
    if not subscription:
        raise HTTPException(status_code=404, detail="Subscription not found")
    return subscription
