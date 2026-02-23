from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
import app.db.crud as crud
import app.schemas.schemas as schemas
from sqlalchemy.orm import Session
from app.db.database import get_db

router = APIRouter(prefix="/api/user", tags=["user"])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")

@router.get("/", response_model=list[schemas.SubscriptionResponse])
async def get_user(db: Session = Depends(get_db)):
    return crud.get_user(db)

