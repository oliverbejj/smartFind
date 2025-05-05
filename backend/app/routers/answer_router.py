from fastapi import APIRouter, HTTPException # type: ignore
from pydantic import BaseModel # type: ignore
from typing import List
from openai import OpenAI # type: ignore
import os
from app.db.models import Chunk, Document, ChatMessage

from app.models.embedder import generate_embeddings
from app.db import database, crud
from app.db.models import Chunk, Document
from sqlalchemy.orm import Session # type: ignore
import math
from uuid import UUID
from datetime import datetime, timezone

router = APIRouter()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


class AnswerRequest(BaseModel):
    query: str
    top_k: int = 3
    chat_session_id: UUID


class AnswerResponse(BaseModel):
    id: UUID
    question: str
    answer: str
    created_at: datetime
    sources: List[str]




def cosine_similarity(vec1: List[float], vec2: List[float]) -> float:
    dot_product = sum(a * b for a, b in zip(vec1, vec2))
    magnitude_vec1 = math.sqrt(sum(a * a for a in vec1))
    magnitude_vec2 = math.sqrt(sum(b * b for b in vec2))
    if magnitude_vec1 == 0 or magnitude_vec2 == 0:
        return 0.0
    return dot_product / (magnitude_vec1 * magnitude_vec2)


@router.post("/", response_model=AnswerResponse)
def generate_answer(payload: AnswerRequest):
    db: Session = database.SessionLocal()

    chunks: List[Chunk] = db.query(Chunk).join(Document).filter(Document.chat_session_id ==  payload.chat_session_id).all()
    if not chunks:
        raise HTTPException(status_code=404, detail="No chunks available for answering.")

    try:
        query_embedding = generate_embeddings([payload.query])[0]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Embedding failed: {str(e)}")

    scored = [
        (cosine_similarity(query_embedding, chunk.embedding), chunk)
        for chunk in chunks
    ]
    scored.sort(key=lambda x: x[0], reverse=True)


    top_chunks = scored[:payload.top_k]

    top_matches = [entry.text for _, entry in top_chunks]

    doc_names = list({chunk.document.name for _, chunk in top_chunks})

    if not top_matches:
        return {
            "id": UUID(int=0),
            "question": payload.query,
            "answer": "No relevant information found.",
            "created_at": datetime.now(timezone.utc), 
            "sources": [],
        }

    context = "\n\n".join(top_matches)

    prompt = f"""Use the following context to answer the question as accurately as possible.

Context:
{context}

Question:
{payload.query}

Answer:"""

    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.3,
            max_tokens=300,
        )
        answer = response.choices[0].message.content.strip()

        sources = ", ".join(doc_names)

        message = ChatMessage(
            chat_session_id=payload.chat_session_id,
            question=payload.query,
            answer=answer,
            sources=sources,  
        )

        db.add(message)
        db.commit()
        db.refresh(message)  

        return AnswerResponse(
            id=message.id,
            question=message.question,
            answer=message.answer,
            created_at=message.created_at,
            sources=doc_names
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"OpenAI request failed: {str(e)}")
