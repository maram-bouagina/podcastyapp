from fastapi import APIRouter, FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
from .database import get_db
from .models import User
import os
from pydantic import BaseModel

from fastapi.security import OAuth2PasswordBearer
router = APIRouter()

import os
SECRET_KEY = os.getenv("SECRET_KEY", "your_default_secret_key")  
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 1440

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class LoginRequest(BaseModel):
    email: str
    password: str

def create_access_token(data: dict, expires_delta: timedelta):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def get_current_user_role(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        role: str = payload.get("role")
        if role is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    return role


def require_super_admin(role: str = Depends(get_current_user_role)):
    if role != "super-admin":
        raise HTTPException(status_code=403, detail="Only super admins can access this resource")
    return role

def require_admin(role: str = Depends(get_current_user_role)):
    if role not in ["super-admin", "admin"]:
        raise HTTPException(status_code=403, detail="Only admins can access this resource")
    return role

@router.post("/login/")
def login(login_data: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == login_data.email).first()
    
    if not user or not pwd_context.verify(login_data.password, user.password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    access_token = create_access_token(
        data={"sub": user.email,"role": user.role}, expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    
    return {"access_token": access_token, "token_type": "bearer","userId": user.id,"role": user.role}