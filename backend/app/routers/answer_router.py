from fastapi import APIRouter, HTTPException # type: ignore
from pydantic import BaseModel # type: ignore
from typing import List
from app.services.memory_storage_service import MemoryStorageService
from app.models.embedder import generate_embeddings
from openai import OpenAI # type: ignore
import os

router = APIRouter()
memory_storage = MemoryStorageService()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


class AnswerRequest(BaseModel):
    query: str
    top_k: int = 3


class AnswerResponse(BaseModel):
    answer: str


@router.post("/", response_model=AnswerResponse)
def generate_answer(payload: AnswerRequest):
    if not memory_storage.get_all_chunks():
        raise HTTPException(status_code=404, detail="No documents available.")

    try:
        query_embedding = generate_embeddings([payload.query])[0]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Embedding failed: {str(e)}")

    matches = memory_storage.search_similar_chunks(query_embedding, top_k=payload.top_k)
    if not matches:
        return {"answer": "No relevant information found."}

    context = "\n\n".join([m["text"] for m in matches])

    prompt = f"""Use the following context to answer the question as accurately as possible.

Context:
{context}

Question:
{payload.query}

Answer:"""

    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "user", "content": prompt}
            ],
            temperature=0.3,
            max_tokens=300,
        )

        answer = response.choices[0].message.content.strip()
        return {"answer": answer}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"OpenAI request failed: {str(e)}")
