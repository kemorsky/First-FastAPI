from datetime import datetime, timedelta

from sqlalchemy.orm import Session
import app.models.models as models
import app.schemas.schemas as schemas

def get_pets(db: Session):
    return db.query(models.Pet).all()

def get_pet(db: Session, pet_id: int):
    return db.query(models.Pet).filter(models.Pet.id == pet_id).first()

def create_pet(db: Session, pet: schemas.PetCreate):
    db_pet = models.Pet(**pet.model_dump())
    db.add(db_pet)
    db.commit()
    db.refresh(db_pet)
    return db_pet

# subscriptions

def get_subscriptions(db: Session):
    return db.query(models.Subscription).all()

def create_subscription(db: Session, subscription: schemas.SubscriptionCreate):
    db_subscription = models.Subscription(**subscription.model_dump())
    db.add(db_subscription)
    db.commit()
    db.refresh(db_subscription)
    return db_subscription

def delete_subscription(db: Session, subscription_id: int):
    db_subscription = (db.query(models.Subscription).filter(models.Subscription.id == subscription_id).first())

    db.delete(db_subscription)
    db.commit()

    return db_subscription

def create_purchase(db: Session, purchase: schemas.UserSubscriptionCreate):
    # used to copy price of subscription and bring it over to the purchase row
    subscription = (db.query(models.Subscription).filter_by(id=purchase.subscription_id).first())
    if not subscription:
        raise ValueError("Subscription does not exist")
    
    db_purchase = models.UserSubscription(
        user_id=purchase.user_id,
        subscription_id=purchase.subscription_id,
        status="active",
        price_paid=subscription.price,
        started_at=datetime.now(),
        expires_at=datetime.now() + timedelta(days=30),
    )
    db.add(db_purchase)
    db.commit()
    db.refresh(db_purchase)
    return db_purchase

def delete_purchase(db: Session, purchase_id: int):
    # used to copy price of subscription and bring it over to the purchase row
    db_subscription = (db.query(models.UserSubscription).filter_by(id=purchase_id).first())
    if not db_subscription:
        raise ValueError("Purchase does not exist")
    
    db.delete(db_subscription)
    db.commit()

# users

def get_users(db: Session):
    return db.query(models.User).all()

def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()
