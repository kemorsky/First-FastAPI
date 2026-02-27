from sqlalchemy.orm import Session, joinedload
import app.models.models as models

# subscriptions

def get_products(db: Session):
    return db.query(models.Plan).all()

def get_plans(db: Session):
    return db.query(models.Plan).all()

def get_user_subscription(db: Session, plan_id: int):
    return db.query(models.UserSubscription).filter(models.UserSubscription.plan_id == plan_id).all()

def create_checkout_session(db: Session, plan_id: int):
    return db.query(models.Plan).filter(models.Plan.id == plan_id).first()

# users

def get_users(db: Session):
    return db.query(models.User).all()

def get_user(db: Session, user_id: int):
    return db.query(models.User).options(joinedload(models.User.purchases)).filter(models.User.id == user_id).first()
