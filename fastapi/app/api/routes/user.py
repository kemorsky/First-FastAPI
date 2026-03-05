import logging
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
import app.db.crud as crud
from app.schemas.schemas import UserResponse
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.core.security import get_current_user
from app.models.models import User

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/users", tags=["user"])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")

@router.get("/", response_model=list[UserResponse])
async def get_users(db: Session = Depends(get_db)):
    return crud.get_users(db)

@router.get("/me", response_model=UserResponse)
async def get_user(current_user: User = Depends(get_current_user)):
    try:
        user = {
            "id": current_user.id,
            "full_name": current_user.full_name,
            "email": current_user.email,
            "picture": current_user.picture,
            "disabled": current_user.disabled,
            "oauth_provider": current_user.oauth_provider,
            "created_at": current_user.created_at,
            "purchases": current_user.purchases
        }
        return await user
    except Exception as e:
        logger.error("Error retrieving user information")
        raise HTTPException(status_code=404, detail="User not found")

@router.get("/{user_id}", response_model=UserResponse)
async def get_user(user_id: int, db: Session = Depends(get_db)):
    try:
        user = crud.get_user(db, user_id)
        return await user
    except Exception as e:
        logger.error("Error retrieving user")
        raise HTTPException(status_code=404, detail="User not found")

