from fastapi import APIRouter, HTTPException # type: ignore
from pydantic import BaseModel # type: ignore
from typing import List
from app.services.memory_storage_service import MemoryStorageService
from app.models.embedder import generate_embeddings

router = APIRouter()

# Reuse the same memory store as upload
memory_storage = MemoryStorageService()

# Pydantic request model
class SearchRequest(BaseModel):
    query: str
    top_k: int = 3  # Optional: return top 3 matches by default

# Pydantic response model
class SearchResult(BaseModel):
    document_name: str
    chunk_index: int
    text: str
    score: float


@router.post("/", response_model=List[SearchResult])
def semantic_search(payload: SearchRequest):
    # Edge case: nothing stored
    if not memory_storage.get_all_chunks():
        raise HTTPException(status_code=404, detail="No documents available for search.")

    # Generate embedding for the query
    try:
        query_embedding = generate_embeddings([payload.query])[0]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Embedding failed: {str(e)}")

    # Search top-K most similar
    matches = memory_storage.search_similar_chunks(query_embedding, top_k=payload.top_k)

    return [
        SearchResult(
            document_name=m["document_name"],
            chunk_index=m["chunk_index"],
            text=m["text"],
            score=m["score"],
        )
        for m in matches
    ]
