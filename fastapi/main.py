from fastapi import FastAPI, HTTPException, status, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import app.models.models as models
from app.db.database import engine, get_db
from app.utils.config import Settings
from app.core.security import get_current_user
import app.schemas.schemas as schemas
import app.db.crud as crud
from app.api.routes.subscriptions import router as subscriptions_router
from app.api.routes.auth import router as auth_router
from app.api.routes.user import router as user_router

models.Base.metadata.create_all(bind=engine)

settings = Settings()

app = FastAPI()

# app = FastAPI(swagger_ui_init_oauth={
#         "clientId": settings.GOOGLE_CLIENT_ID,
#         "clientSecret": settings.GOOGLE_CLIENT_SECRET,
#         "useBasicAuthenticationWithAccessCodeGrant": True,
#         "scopes": ["openid", "email", "profile"]
#     })

app.include_router(subscriptions_router)
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

@app.get("/pets", response_model=list[schemas.PetResponse])
async def read_pets(db: Session = Depends(get_db)):
    return crud.get_pets(db)

@app.get("/pets/{pet_id}", response_model=schemas.PetResponse)
async def read_pet(pet_id: int, db: Session = Depends(get_db)):
    pet = crud.get_pet(db, pet_id)
    if not pet:
        raise HTTPException(status_code=404, detail="Pet not found")
    return pet

@app.post("/pets", response_model=schemas.PetResponse, status_code=status.HTTP_201_CREATED)
async def create_pet(pet: schemas.PetCreate, db: Session = Depends(get_db)):
    pet = crud.create_pet(db, pet)
    if not pet:
        raise HTTPException(status_code=400, detail="Pet not created")
    return pet