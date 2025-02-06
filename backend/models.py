from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from .database import Base
from datetime import datetime

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    country = Column(String(255), nullable=False)
    organization = Column(String(255), nullable=True)
    password = Column(String(255), nullable=False)

    podcasts = relationship("Podcast", back_populates="owner")

class Podcast(Base):
    __tablename__ = "podcasts"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(String(500), nullable=False) 
    filename = Column(String(255), nullable=False)
    upload_date = Column(DateTime, default=datetime.utcnow)  
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    owner = relationship("User", back_populates="podcasts")

class Contact(Base):
    __tablename__ = "contacts"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False)
    subject = Column(String(255), nullable=False)
    message = Column(String(500), nullable=False)
