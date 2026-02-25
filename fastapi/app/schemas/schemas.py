from pydantic import BaseModel, Field, ConfigDict
from typing import Optional
from datetime import datetime

class PetCreate(BaseModel):
    name: str
    age: int
    type: str

class PetResponse(PetCreate):
    id: int

    model_config = ConfigDict(from_attributes=True)

class ProductCreate(BaseModel):
    name: str
    description: str = Field(..., min_length=10, max_length= 140)
    price: float

class ProductResponse(ProductCreate):
    id: int

    model_config = ConfigDict(from_attributes=True)

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: str | None = None

class UserCreate(BaseModel):
    email: str | None = None
    full_name: str | None = None
    picture: str | None = None
    disabled: bool | None = None

    model_config = ConfigDict(from_attributes=True)

class UserResponse(UserCreate):
    id: int
    oauth_provider: str | None = None
    email: str | None = None
    full_name: str | None = None
    picture: str | None = None
    disabled: bool | None = None
    created_at: datetime

    purchases: list[UserSubscriptionResponse] = []
    
    model_config = ConfigDict(from_attributes=True)

class UsrInDB(UserResponse):
    hashed_password: str

class UserSubscriptionCreate(BaseModel):
    subscription_id: int
    user_id: int

class UserSubscriptionResponse(BaseModel):
    id: int
    user_id: int
    status: str | None = None
    price_paid: float | None = None
    started_at: datetime | None = None
    expires_at: datetime | None = None

    subscription: SubscriptionResponse

    model_config = ConfigDict(from_attributes=True)

class SubscriptionCreate(BaseModel):
    name: str = Field(..., min_length=3, max_length=35)
    description: str = Field(..., min_length=10, max_length= 140)
    price: float

class SubscriptionResponse(SubscriptionCreate):
    id: int

    model_config = ConfigDict(from_attributes=True)