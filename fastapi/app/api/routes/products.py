from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas.schemas import PlanResponse
from app.db.crud import get_products
from app.db.database import get_db
from app.services.services_products import sync_products_from_stripe

router = APIRouter(prefix="/api/products", tags=["products"])

@router.get("/get-products", response_model=list[PlanResponse])
async def get_products_route(db: Session = Depends(get_db)):
    sync_products_from_stripe(db)
    return get_products(db)