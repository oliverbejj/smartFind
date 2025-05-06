from fastapi import APIRouter, HTTPException   # type: ignore
from pydantic import BaseModel # type: ignore
from typing import List
from uuid import UUID
from datetime import datetime

from app.db import database
from app.db.models import ChatSession, Document
from sqlalchemy.orm import Session # type: ignore
from app.db.models import ChatMessage

router = APIRouter()
db: Session = database.SessionLocal()


class ChatSessionCreate(BaseModel):
    name: str

class ChatSessionOut(BaseModel):
    id: UUID
    name: str
    created_at: datetime

class ChatWithDocs(BaseModel):
    id: UUID
    name: str
    created_at: datetime
    documents: List[str]

class DocumentOut(BaseModel):
    id: UUID
    name: str
    uploaded_at: str
    chunk_count: int

class ChatMessageOut(BaseModel):
    id: UUID
    question: str
    answer: str
    created_at: datetime
    sources: List[str] = []

    class Config:
        orm_mode = True



@router.post("/", response_model=ChatSessionOut)
def create_chat_session(payload: ChatSessionCreate):
    chat = ChatSession(name=payload.name)
    db.add(chat)
    db.commit()
    db.refresh(chat)
    return chat


@router.get("/", response_model=List[ChatSessionOut])
def list_chat_sessions():
    return db.query(ChatSession).order_by(ChatSession.created_at.desc()).all()


@router.delete("/{chat_id}")
def delete_chat_session(chat_id: UUID):
    chat = db.query(ChatSession).filter(ChatSession.id == chat_id).first()
    if not chat:
        raise HTTPException(status_code=404, detail="Chat session not found.")
    db.delete(chat)
    db.commit()
    return {"message": f"Chat {chat_id} deleted successfully."}



@router.get("/{chat_id}/documents", response_model=List[DocumentOut])
def get_documents_for_chat(chat_id: UUID):
    chat = db.query(ChatSession).filter(ChatSession.id == chat_id).first()
    if not chat:
        raise HTTPException(status_code=404, detail="Chat session not found.")

    return [
        DocumentOut(
            id=doc.id,
            name=doc.name,
            uploaded_at=doc.uploaded_at.isoformat(),
            chunk_count=len(doc.chunks),
        )
        for doc in chat.documents
    ]


@router.get("/{chat_id}/messages", response_model=List[ChatMessageOut])
def get_messages_for_chat(chat_id: UUID):
    chat = db.query(ChatSession).filter(ChatSession.id == chat_id).first()
    if not chat:
        raise HTTPException(status_code=404, detail="Chat session not found.")

    return [
    ChatMessageOut(
        id=msg.id,
        question=msg.question,
        answer=msg.answer,
        created_at=msg.created_at,
        sources=msg.sources.split(", ") if msg.sources else []
    )
    for msg in sorted(chat.messages, key=lambda m: m.created_at)
    ]


