from sqlalchemy import Column, Integer, String, Float, DateTime
from app.db.database import Base
import datetime

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
    description = Column(Integer, nullable=False)
    price = Column(Float, nullable=False)

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    oauth_provider = Column(String, nullable=False)
    oauth_id = Column(Integer, unique=True, nullable=False)
    
    email = Column(String, unique=True, index=True)
    username = Column(String)

    # created_at = Column(DateTime, default=datetime.now)