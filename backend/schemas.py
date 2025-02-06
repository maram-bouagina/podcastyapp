from pydantic import BaseModel

class ContactCreate(BaseModel):
    username: str
    email: str
    subject: str
    message: str

class Contact(ContactCreate):
    id: int

    class Config:
        from_attributes = True  