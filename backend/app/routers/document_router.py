from fastapi import APIRouter # type: ignore
from pydantic import BaseModel # type: ignore
from typing import List
from app.services.memory_storage_service import MemoryStorageService

router = APIRouter()
memory = MemoryStorageService()


class DocumentInfo(BaseModel):
    name: str
    num_chunks: int


@router.get("/", response_model=List[DocumentInfo])
def get_documents():
    """
    Returns a list of uploaded documents and their metadata.
    """
    return memory.list_documents()
