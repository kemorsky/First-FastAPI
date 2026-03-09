from fastapi import FastAPI
import logging
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import app.models.models as models
from app.db.database import engine
from app.utils.config import settings
from app.api.routes.payments import router as payments_router
from app.api.routes.auth import router as auth_router
from app.api.routes.user import router as user_router
from app.api.routes.products import router as products_router

models.Base.metadata.create_all(bind=engine)

logging.basicConfig(
    level=logging.INFO, 
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)

logger = logging.getLogger(__name__)

app = FastAPI()

# app = FastAPI(swagger_ui_init_oauth={
#         "clientId": settings.GOOGLE_CLIENT_ID,
#         "clientSecret": settings.GOOGLE_CLIENT_SECRET,
#         "useBasicAuthenticationWithAccessCodeGrant": True,
#         "scopes": ["openid", "email", "profile"]
#     })

app.include_router(products_router)
app.include_router(payments_router)
app.include_router(auth_router)
app.include_router(user_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Or * when in dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    logger.debug("Debug info - verbose details for troubleshooting")
    logger.info("Processing request to root endpoint")
    return {"message": "Hello World"}