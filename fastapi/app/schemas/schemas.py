from pydantic import BaseModel, Field, ConfigDict
from typing import Optional
from datetime import datetime

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

class UserSubscriptionBase(BaseModel):
    user_id: int
    plan_id: int

class UserSubscriptionResponse(UserSubscriptionBase):
    id: int
    user_id: int
    plan_id: str
    price_paid: float | None = None
    started_at: datetime | None = None
    expires_at: datetime | None = None
    stripe_subscription_id: str

    status: str
    current_period_start: datetime
    current_period_end: datetime

    model_config = ConfigDict(from_attributes=True)

class PlanBase(BaseModel):
    name: str
    description: str
    price: float

class PlanResponse(PlanBase):
    id: int
    stripe_product_name: str
    stripe_price_id: str

    model_config = ConfigDict(from_attributes=True)

class CreateCheckoutSession(BaseModel):
    price_id: str
    product_id: str

class Credits(BaseModel):
    remaining_post_creations: str
    remaining_post_cretions_one_time: str

class CheckoutSessionResponse(BaseModel):
    checkout_url: str