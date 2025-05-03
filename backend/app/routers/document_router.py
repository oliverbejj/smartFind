from fastapi import APIRouter # type: ignore
from pydantic import BaseModel # type: ignore
from typing import List
from app.services.db_storage_service import DBStorageService

router = APIRouter()
storage = DBStorageService()

class DocumentOut(BaseModel):
    id: str
    name: str
    uploaded_at: str
    chunk_count: int
    

@router.get("/", response_model=List[DocumentOut])
def list_documents():
    docs = storage.list_documents()
    return [
        DocumentOut(
            id=str(doc.id),
            name=doc.name,
            uploaded_at=doc.uploaded_at.isoformat(),
            chunk_count=len(doc.chunks)
        )
        for doc in docs
    ]
