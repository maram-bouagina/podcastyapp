from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from . import crud
from fastapi.middleware.cors import CORSMiddleware
from .database import get_db
from .uploadPodcasty import router as upload_router  # Import du fichier des uploads
from . import contact

#import register
from . import register
#import auth
from . import auth

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



app.include_router(register.router, prefix="/user")


app.include_router(auth.router, prefix="/auth")

app.include_router(upload_router) 

app.include_router(contact.router, prefix="/admin")
