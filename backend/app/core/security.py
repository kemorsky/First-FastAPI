import logging
from fastapi import HTTPException, Depends, Request
from typing import Optional
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer
import jwt
from jwt import ExpiredSignatureError, DecodeError
from jwt.exceptions import InvalidTokenError
from app.utils.config import settings
from app.db.database import get_db
import app.db.crud as crud

# oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/signin")

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)
logger = logging.getLogger(__name__)

def get_current_user(request: Request, db: Session = Depends(get_db)): # add token_header: Optional[str] = Depends(oauth2_scheme) when working in Postman

    # get token from cookie or header
    token = request.cookies.get("access_token") # or token_header --- TODO - remove when in prod
    
    if not token: # checking it here allows the server to request identification without bloating the routes themselves
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        logger.info(f"Raw cookies: {request.cookies}")
        logger.info(f"Token used: {token}")
        if not payload:
            raise HTTPException(status_code=401, detail="Invalid token - payload")

        user_id: str = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid token - sub")
        
    except (InvalidTokenError, ExpiredSignatureError, DecodeError) as e:
        logger.error(f"Error using token: {e}")
        raise HTTPException(status_code=401, detail="Token Error: Invalid token")

    user = crud.get_user(db, user_id)

    if not user:
        raise HTTPException(status_code=401, detail="User not found")  

    if user.disabled:
        raise HTTPException(status_code=401, detail="User is disabled")
    
    return user