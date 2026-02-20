from fastapi import APIRouter, Depends, HTTPException, status
import app.db.crud as crud
import app.schemas.schemas as schemas
from sqlalchemy.orm import Session
from db.database import get_db

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

@router.delete("/{subscription_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_subscription(subscription_id: int, db: Session = Depends(get_db)):
    subscription = crud.delete_subscription(db, subscription_id)
    if not subscription:
        raise HTTPException(status_code=404, detail="Subscription not found")
    return subscription
