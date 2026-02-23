from fastapi import HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
import jwt
from jwt.exceptions import InvalidTokenError
from app.utils.config import Settings

settings = Settings()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")

def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        email: str = payload.get("sub")
        name: str = payload.get("name")
        picture: str = payload.get("picture")
        if email is None or name is None or picture is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        return {"email": email, "name": name, "picture": picture}
    except InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")