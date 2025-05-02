from fastapi import APIRouter # type: ignore
from app.services.memory_storage_service import MemoryStorageService

router = APIRouter()

memory_storage = MemoryStorageService()

@router.get("/health")
async def health_check():
    return {"status": "ok"}


@router.post("/reset")
def reset_storage():
    """
    Clears all stored documents, embeddings, and chunks.
    """
    memory_storage.clear()
    return {"message": "All stored memory cleared."}