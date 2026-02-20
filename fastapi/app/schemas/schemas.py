from pydantic import BaseModel, Field, ConfigDict
from typing import Optional

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

class SubscriptionCreate(BaseModel):
    name: str = Field(..., min_length=3, max_length=35)
    description: str = Field(..., min_length=10, max_length= 140)
    price: float

class SubscriptionResponse(SubscriptionCreate):
    id: int

    model_config = ConfigDict(from_attributes=True)
