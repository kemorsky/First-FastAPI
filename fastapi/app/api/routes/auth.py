from fastapi import APIRouter, Depends, HTTPException, status
import app.db.crud as crud
import app.schemas.schemas as schemas
from sqlalchemy.orm import Session
from db.database import get_db

router = APIRouter(prefix="/api/auth", tags=["auth"])