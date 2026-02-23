from typing import Optional, Annotated
from fastapi import Request, APIRouter, Depends, HTTPException, status
from fastapi.responses import HTMLResponse, RedirectResponse
from app.utils.config import Settings
import jwt
from datetime import datetime, timedelta
import httpx
from dotenv import load_dotenv
from pathlib import Path
from urllib.parse import urlencode
from app.core.security import get_current_user

router = APIRouter(prefix="/api/auth", tags=["auth"])

env_path = Path(__file__).resolve().parent.parent.parent.parent / ".env"
load_dotenv(dotenv_path=env_path)

settings = Settings()

if not all ([settings.GOOGLE_CLIENT_ID, settings.GOOGLE_CLIENT_SECRET, settings.GOOGLE_REDIRECT_URI]):
    raise RuntimeError("Missing environment variables")

GOOGLE_AUTH_ENDPOINT = "https://accounts.google.com/o/oauth2/v2/auth"
GOOGLE_TOKEN_ENDPOINT = "https://oauth2.googleapis.com/token"
GOOGLE_USERINFO_ENDPOINT = "https://www.googleapis.com/oauth2/v2/userinfo"

@router.get("/", response_class=HTMLResponse)
async def home():
    return """
        <h2>Welcome to the OAuth2 FastAPI project</h2>
        <a href="/api/auth/login">Login with Google</a>
        """

@router.get("/login")
def login():
    query_parems = {
        "client_id": settings.GOOGLE_CLIENT_ID,
        "redirect_uri": settings.GOOGLE_REDIRECT_URI,
        "response_type": "code",
        "scope": "openid email profile",
        "access_type": "offline",
        "prompt": "consent"
    }
    url = f"{GOOGLE_AUTH_ENDPOINT}?{urlencode(query_parems)}"
    return RedirectResponse(url)

@router.get("/callback")
async def auth_callback(request: Request):
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
        token_response = await client.post(GOOGLE_TOKEN_ENDPOINT, data=data)
        token_data = token_response.json()

        google_access_token = token_data.get("access_token")
        if not google_access_token:
            raise HTTPException(status_code=400, detail="Access token not found")
        
        headers = {"Authorization": f"Bearer {google_access_token}"}
        userinfo_response = await client.get(GOOGLE_USERINFO_ENDPOINT, headers=headers)
        userinfo = userinfo_response.json()

        def create_access_token(data: dict, expires_delta: timedelta = timedelta(hours=1)):
            to_encode = data.copy()
            expire = datetime.now() + expires_delta
            to_encode.update({"exp": expire})
            return jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
        
        app_access_token = create_access_token(
            {
                "sub": userinfo["email"], 
                "name": userinfo["name"], 
                "picture": userinfo["picture"]
            }
        )

        return {
            "access_token": app_access_token,
            "token_type": "Bearer"
        }

        # return RedirectResponse(
        #     f"/profile?name={userinfo['name']}&email={userinfo['email']}&picture={userinfo['picture']}"
        # )
    
@router.get("/profile", response_class=HTMLResponse)
async def profile(current_user: dict = Depends(get_current_user)):
    name = current_user["name"]
    email = current_user["email"]
    picture = current_user["picture"]

    return f"""
                <html>
                    <head>
                        <title>Profile</title>
                    </head>
                    <body style="text-align:center;">
                        <h1>Welcome, {name}</h1>
                        <img src="{picture}" alt="{name}" width="120"><br>
                        <p>Email: {email}</p>
                    </body>
                </html>
            """