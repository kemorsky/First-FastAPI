import logging
import secrets
from app.db.database import get_db
from app.models.models import User
from fastapi import Request, APIRouter, Depends, HTTPException
from fastapi.responses import JSONResponse, RedirectResponse
from sqlalchemy.orm import Session
from fastapi.responses import HTMLResponse, RedirectResponse
from app.utils.config import settings
import jwt
from datetime import datetime
import httpx
from dotenv import load_dotenv
from pathlib import Path
from urllib.parse import urlencode
from app.services.services_auth import create_access_token

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)
logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/auth", tags=["auth"])

env_path = Path(__file__).resolve().parent.parent.parent.parent / ".env"
load_dotenv(dotenv_path=env_path)

state = secrets.token_urlsafe(32)

if not all ([settings.GOOGLE_CLIENT_ID, settings.GOOGLE_CLIENT_SECRET, settings.GOOGLE_REDIRECT_URI]):
    logger.error("Missing environment variables")
    raise RuntimeError("Missing environment variables")

@router.get("/", response_class=HTMLResponse)
async def home():
    return """
        <h2>Welcome to the OAuth2 FastAPI project</h2>
        <a href="/api/auth/login">Login with Google</a>
        """

@router.get("/signin")
def sign_in():
    try:
        query_parems = {
            "client_id": settings.GOOGLE_CLIENT_ID,
            "redirect_uri": settings.GOOGLE_REDIRECT_URI,
            "response_type": "code",
            "scope": "openid email profile",
            "access_type": "offline",
            "prompt": "consent",
            "state": state
        }
        url = f"{settings.GOOGLE_AUTH_ENDPOINT}?{urlencode(query_parems)}"
        return RedirectResponse(url)
    except Exception as e:
        logger.error(f"Error logging in: {e}")
        raise HTTPException(status_code=500, detail="Error logging in")

@router.get("/callback")
async def auth_callback(request: Request, db: Session = Depends(get_db)):
    code = request.query_params.get("code")
    if not code:
        raise HTTPException(status_code=400, detail="Authorization Code not found")

    data = {
        "code": code,
        "client_id": settings.GOOGLE_CLIENT_ID,
        "client_secret": settings.GOOGLE_CLIENT_SECRET,
        "redirect_uri": settings.GOOGLE_REDIRECT_URI,
        "grant_type": "authorization_code"
    }

    async with httpx.AsyncClient() as client:
        token_response = await client.post(settings.GOOGLE_TOKEN_ENDPOINT, data=data)
        token_data = token_response.json()

        google_access_token = token_data.get("access_token")
        if not google_access_token:
            logger.error("Access token not found")
            raise HTTPException(status_code=400, detail="Access token not found")
        
        headers = {"Authorization": f"Bearer {google_access_token}"}
        userinfo_response = await client.get(settings.GOOGLE_USERINFO_ENDPOINT, headers=headers)
        userinfo = userinfo_response.json()
        
        google_id = userinfo["id"]
        email = userinfo["email"]

        user = db.query(User).filter(User.oauth_id == google_id).first()

        if not user:
            user = User(
                oauth_provider="google",
                oauth_id=google_id,
                email=email,
                full_name=userinfo.get("name"),
                picture=userinfo.get("picture"),
                created_at=datetime.now(),
                disabled=False,
                purchases=[]
            )
            db.add(user)
            db.commit()
            db.refresh(user)
        
        app_access_token = create_access_token(
            {
                "sub": str(user.id),
            }
        )

        response = RedirectResponse({settings.FRONTEND_URI}, status_code=302)

        response.set_cookie(
            key="access_token",
            value=app_access_token,
            httponly=True,
            secure=True,
            samesite="lax",
            max_age=1800
        )

        return response