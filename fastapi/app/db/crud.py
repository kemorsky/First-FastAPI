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

# users

def get_users(db: Session):
    return db.query(models.User).all()

def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()