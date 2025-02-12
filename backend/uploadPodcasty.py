from fastapi import APIRouter, HTTPException, File, UploadFile, Depends, Form #Form   File
from fastapi.responses import FileResponse #?
from pydantic import BaseModel
from typing import List #?
from datetime import datetime
import os
from sqlalchemy.orm import Session
from .database import get_db
from . import models  

router = APIRouter()

UPLOAD_DIR = "podcasts_files"
os.makedirs(UPLOAD_DIR, exist_ok=True)


class PodcastResponse(BaseModel):
    id: int
    title: str
    description: str
    filename: str
    upload_date: datetime
    user_id: int


@router.get("/api/mypodcasts", response_model=List[PodcastResponse])
async def get_my_podcasts(user_id: int, db: Session = Depends(get_db)):
    podcasts = db.query(models.Podcast).filter(models.Podcast.user_id == user_id).all()
    return podcasts


@router.post("/api/podcasts", response_model=PodcastResponse)
async def create_podcast(
    title: str = Form(...),
    description: str = Form(...),
    file: UploadFile = File(...),
    user_id: int = Form(...), 
    db: Session = Depends(get_db)
):
    file_extension = file.filename.split('.')[-1]
    file_name = f"podcast_{datetime.now().strftime('%Y%m%d%H%M%S')}.{file_extension}"
    file_path = os.path.join(UPLOAD_DIR, file_name)

    with open(file_path, "wb") as f:
        f.write(await file.read())

    new_podcast = models.Podcast(
        title=title,
        description=description,
        filename=file_name,
        upload_date=datetime.now(),
        user_id=user_id,
    )
    db.add(new_podcast)
    db.commit()
    db.refresh(new_podcast)

    return new_podcast


@router.get("/uploads/{filename}")
async def get_podcast_file(filename: str):
    file_path = os.path.join(UPLOAD_DIR, filename)
    if os.path.exists(file_path):
        return FileResponse(file_path)
    raise HTTPException(status_code=404, detail="Fichier non trouvé")

@router.get("/uploads/{filename}")
async def get_podcast_file(filename: str):
    file_path = os.path.join(UPLOAD_DIR, filename)
    if os.path.exists(file_path):
        return FileResponse(file_path)
    raise HTTPException(status_code=404, detail="Fichier non trouvé")

@router.delete("/api/podcasts/{podcast_id}")
async def delete_podcast(podcast_id: int, db: Session = Depends(get_db)):
  
    podcast = db.query(models.Podcast).filter(models.Podcast.id == podcast_id).first()
    if not podcast:
        raise HTTPException(status_code=404, detail="Podcast not found")
    
   
    db.delete(podcast)
    db.commit()

    file_path = os.path.join(UPLOAD_DIR, podcast.filename)
    if os.path.exists(file_path):
        os.remove(file_path)
    else:
        raise HTTPException(status_code=404, detail="Podcast file not found")

    return {"message": "Podcast deleted successfully"}