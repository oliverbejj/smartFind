from sqlalchemy.orm import Session # type: ignore
from app.db import models
from typing import List
import uuid

def create_document(db: Session, name: str, user_id=None) -> models.Document:
    doc = models.Document(name=name, user_id=user_id)
    db.add(doc)
    db.commit()
    db.refresh(doc)
    return doc

def add_chunk(db: Session, document_id: uuid.UUID, text: str, embedding: List[float], index: int):
    chunk = models.Chunk(
        document_id=document_id,
        text=text,
        embedding=embedding,
        chunk_index=index
    )
    db.add(chunk)
    db.commit()

def list_documents(db: Session):
    return db.query(models.Document).order_by(models.Document.uploaded_at.desc()).all()

def get_chunks_for_document(db: Session, document_id: uuid.UUID):
    return db.query(models.Chunk).filter(models.Chunk.document_id == document_id).all()
