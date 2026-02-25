from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.db.database import Base
from datetime import datetime

class Pet(Base):
    __tablename__ = "pets"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    age = Column(Integer, nullable=False)
    type = Column(String, nullable=False)

class Subscription(Base):
    __tablename__ = "subscriptions"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(String, nullable=False)
    price = Column(Float, nullable=False)

    purchases = relationship("UserSubscription", back_populates="subscription")

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    oauth_provider = Column(String, nullable=False) # "google"
    oauth_id = Column(String, unique=True, nullable=False)
    
    username = Column(String)
    email = Column(String, unique=True, index=True)
    full_name = Column(String)
    picture = Column(String, nullable=True)

    disabled = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.now)

    purchases = relationship("UserSubscription", back_populates="user")

class UserSubscription(Base):
    __tablename__ = "user_subscriptions"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"))
    subscription_id = Column(Integer, ForeignKey("subscriptions.id"))

    status = Column(String, nullable=False)
    price_paid = Column(Float, nullable=False)
    started_at = Column(DateTime, nullable=False)
    expires_at = Column(DateTime, nullable=False)

    user = relationship("User", back_populates="purchases")
    subscription = relationship("Subscription", back_populates="purchases")