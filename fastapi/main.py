from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import app.models.models as models
from app.scripts.sync_stripe_products import sync_stripe_products
from app.db.database import engine
from app.utils.config import Settings
from app.api.routes.payments import router as payments_router
from app.api.routes.auth import router as auth_router
from app.api.routes.user import router as user_router

models.Base.metadata.create_all(bind=engine)

settings = Settings()

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Run Stripe → DB sync on startup
    sync_stripe_products()
    yield
    # optional shutdown code here

app = FastAPI(lifespan=lifespan)

# app = FastAPI(swagger_ui_init_oauth={
#         "clientId": settings.GOOGLE_CLIENT_ID,
#         "clientSecret": settings.GOOGLE_CLIENT_SECRET,
#         "useBasicAuthenticationWithAccessCodeGrant": True,
#         "scopes": ["openid", "email", "profile"]
#     })

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
    return {"message": "Hello World"}