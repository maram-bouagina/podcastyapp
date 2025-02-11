from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from .database import get_db, Base, engine
from .models import User
from pydantic import BaseModel
from .auth import require_super_admin
router = APIRouter()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

@router.on_event("startup")
def startup():
    Base.metadata.create_all(bind=engine)

class RegisterRequest(BaseModel):
    username: str
    email: str
    country: str
    organization: str = None  # Optional field
    password: str
    role: str = "user" 

@router.post("/create-admin/")
def create_admin(user: RegisterRequest, db: Session = Depends(get_db), role: str = Depends(require_super_admin)):
    # Ensure only "admin" or "user" roles can be created
    if user.role not in ["admin", "user"]:
        raise HTTPException(status_code=400, detail="Invalid role")

    # Check if the email is already registered
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    # Hash the password
    hashed_password = pwd_context.hash(user.password)

    # Create the new user
    new_user = User(
        username=user.username,
        email=user.email,
        country=user.country,
        organization=user.organization,
        password=hashed_password,
        role=user.role
    )

    # Save the new user to the database
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": f"{user.role.capitalize()} created successfully"}
@router.post("/register/")
def register(user: RegisterRequest, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_password = pwd_context.hash(user.password)

    new_user = User(
        username=user.username,
        email=user.email,
        country=user.country,
        organization=user.organization,
        password=hashed_password,
        role=user.role
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "User registered successfully"}

