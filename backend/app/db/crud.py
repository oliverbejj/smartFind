from sqlalchemy.orm import Session # type: ignore
from app.db import models
from typing import List
from uuid import UUID

def create_document(db: Session, name: str, chat_session_id: UUID) -> models.Document:
    doc = models.Document(name=name, chat_session_id=chat_session_id)
    db.add(doc)
    db.commit()
    db.refresh(doc)
    return doc

def add_chunk(db: Session, document_id: UUID, text: str, embedding: List[float], index: int):
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

def get_chunks_for_document(db: Session, document_id: UUID):
    return db.query(models.Chunk).filter(models.Chunk.document_id == document_id).all()

def get_all_chunks(db: Session):
    return db.query(models.Chunk).all()

