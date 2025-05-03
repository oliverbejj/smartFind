from sqlalchemy.orm import Session # type: ignore
from app.db import crud, database
from app.models.embedder import generate_embeddings
from app.models.text_splitter import split_text_into_chunks
from pathlib import Path
from typing import List
from sqlalchemy.orm import joinedload # type: ignore
from app.db.models import Document
from uuid import UUID


class DBStorageService:
    def __init__(self):
        self.db = database.SessionLocal()

    def process_and_store(self, file_path: str, chat_session_id: UUID):

        from app.models.pdf_reader import extract_text_from_pdf

        pages = extract_text_from_pdf(file_path)
        full_text = "\n".join(pages)
        chunks = split_text_into_chunks(full_text)
        embeddings = generate_embeddings(chunks)

        document_name = Path(file_path).name
        document = crud.create_document(self.db, name=document_name, chat_session_id=chat_session_id)


        for i, (chunk, emb) in enumerate(zip(chunks, embeddings)):
            crud.add_chunk(self.db, document.id, chunk, emb, i)

    def list_documents(self):
        return self.db.query(Document).options(joinedload(Document.chunks)).all()
    

    def delete_document(self, doc_id: str):
        from app.db import models
        try:
            doc_uuid = UUID(doc_id)  # Convert string to UUID
        except ValueError:
            raise ValueError("Invalid document ID format.")

        document = self.db.query(models.Document).filter(models.Document.id == doc_uuid).first()
        if not document:
            raise ValueError("Document not found.")

        # Just delete the document; chunks are removed automatically via cascade
        self.db.delete(document)
        self.db.commit()

        # Optional: remove uploaded file from disk
        file_path = Path("/tmp/smartfind_uploads") / document.name
        if file_path.exists():
            file_path.unlink()
