import logging
from fastapi import APIRouter, Depends, HTTPException, status, Request
from fastapi.security import OAuth2PasswordBearer
import app.db.crud as crud
from app.schemas.schemas import UserResponse
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.core.security import get_current_user
from app.models.models import User

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)
logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/users", tags=["user"])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")

@router.get("/", response_model=list[UserResponse])
async def get_users(db: Session = Depends(get_db)):
    return crud.get_users(db)

@router.get("/me", response_model=UserResponse)
async def get_user(current_user: User = Depends(get_current_user)):
    try:
        return current_user
    except Exception as e:
        logger.error("Error retrieving user information")
        raise HTTPException(status_code=404, detail=f"User not found, {e}")

@router.get("/{user_id}", response_model=UserResponse)
async def get_user(user_id: int, db: Session = Depends(get_db)):
    try:
        user = crud.get_user(db, user_id)
        return user
    except Exception as e:
        logger.error("Error retrieving user")
        raise HTTPException(status_code=404, detail="User not found")