from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship, Mapped
from app.db.database import Base
from datetime import datetime

class Pet(Base):
    __tablename__ = "pets"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    age = Column(Integer, nullable=False)
    type = Column(String, nullable=False)

class Plan(Base):
    __tablename__ = "plans"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(String)

    stripe_product_name = Column(String, unique=True, nullable=False)
    stripe_price_id = Column(String, unique=True, nullable=False)

    # price_id = Column(String, unique=True, nullable=False)
    price = Column(Float, nullable=False)

    purchases = relationship("UserSubscription", back_populates="plan")

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    oauth_provider = Column(String, nullable=False) # "google"
    oauth_id = Column(String, unique=True, nullable=False)

    stripe_customer_id = Column(String, unique=True, nullable=True)
    
    username = Column(String)
    email = Column(String, unique=True, index=True)
    full_name = Column(String)
    picture = Column(String, nullable=True)

    disabled = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.now)

    purchases: Mapped[list[UserSubscription]] = relationship("UserSubscription", back_populates="user")

class UserSubscription(Base):
    __tablename__ = "user_subscriptions"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"))
    plan_id = Column(Integer, ForeignKey("plans.id"))

    stripe_subscription_id = Column(String, unique=True, nullable=False)

    status = Column(String, nullable=False)
    current_period_start = Column(DateTime)
    current_period_end = Column(DateTime)

    user = relationship("User", back_populates="purchases")
    plan = relationship("Plan", back_populates="purchases")