from sqlalchemy.orm import Session # type: ignore
from app.db import crud, database
from app.models.embedder import generate_embeddings
from app.models.text_splitter import split_text_into_chunks
from pathlib import Path
from typing import List
from sqlalchemy.orm import joinedload # type: ignore
from app.db.models import Document


class DBStorageService:
    def __init__(self):
        self.db = database.SessionLocal()

    def process_and_store(self, file_path: str):
        from app.models.pdf_reader import extract_text_from_pdf

        pages = extract_text_from_pdf(file_path)
        full_text = "\n".join(pages)
        chunks = split_text_into_chunks(full_text)
        embeddings = generate_embeddings(chunks)

        document_name = Path(file_path).name
        document = crud.create_document(self.db, name=document_name)

        for i, (chunk, emb) in enumerate(zip(chunks, embeddings)):
            crud.add_chunk(self.db, document.id, chunk, emb, i)

    def list_documents(self):
        return self.db.query(Document).options(joinedload(Document.chunks)).all()
