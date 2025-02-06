from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from . import crud
from .database import get_db

from .models import Contact as ContactModel 
from .schemas import ContactCreate, Contact 
router = APIRouter()

@router.post("/contacts", response_model=Contact)
def create_contact(contact: ContactCreate, db: Session = Depends(get_db)):
 
    new_contact = ContactModel(
        username=contact.username,
        email=contact.email,
        subject=contact.subject,
        message=contact.message
    )
    db.add(new_contact)
    db.commit()
    db.refresh(new_contact)
    return new_contact

@router.get("/contacts", response_model=List[Contact])
def get_contacts(db: Session = Depends(get_db), skip: int = 0, limit: int = 100):
    contacts = crud.get_contacts(db, skip, limit)
    return contacts

@router.delete("/contacts/{contact_id}", response_model=bool)
def delete_contact(contact_id: int, db: Session = Depends(get_db)):
    success = crud.delete_contact(db, contact_id)
    if not success:
        raise HTTPException(status_code=404, detail="Contact message not found")
    return success
