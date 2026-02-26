from fastapi import HTTPException, Depends
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer
import jwt
from jwt.exceptions import InvalidTokenError
from app.utils.config import Settings
from app.db.database import get_db
import app.db.crud as crud
from app.models.models import User

settings = Settings()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        user_id: str = payload.get("sub")

        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        
    except InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

    user = crud.get_user(db, user_id)

    if not user:
        raise HTTPException(status_code=401, detail="User not found")  

    if user.disabled:
        raise HTTPException(status_code=401, detail="User is disabled")
    
    return user