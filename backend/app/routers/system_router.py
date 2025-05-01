from fastapi import APIRouter # type: ignore
from app.services.memory_storage_service import MemoryStorageService

router = APIRouter()

memory_storage = MemoryStorageService()

@router.get("/health")
async def health_check():
    return {"status": "ok"}

@router.get("/documents")
def list_documents():
    """
    Returns the list of unique document names currently stored.
    """
    chunks = memory_storage.get_all_chunks()
    doc_names = sorted({chunk["document_name"] for chunk in chunks})
    return {"documents": doc_names}


@router.post("/reset")
def reset_storage():
    """
    Clears all stored documents, embeddings, and chunks.
    """
    memory_storage.clear()
    return {"message": "All stored memory cleared."}