from app.models.pdf_reader import extract_text_from_pdf
from app.models.text_splitter import split_text_into_chunks
from app.models.embedder import generate_embeddings
from app.services.memory_storage_service import MemoryStorageService
from pathlib import Path

def process_document(
    file_path: str,
    storage: MemoryStorageService,
    max_chunk_chars: int = 500
) -> None:
    """
    Full pipeline: Process a document and store its chunks and embeddings.

    Args:
        file_path (str): Path to the PDF file.
        storage (MemoryStorageService): Storage service instance.
        chunk_size (int): Number of words per chunk.
    """
    # Extract text
    pages = extract_text_from_pdf(file_path)
    full_text = "\n".join(pages)

    # Split text into chunks
    chunks = split_text_into_chunks(full_text, max_chunk_chars=max_chunk_chars)

    # Generate embeddings
    embeddings = generate_embeddings(chunks)

    # Extract document name from path
    document_name = Path(file_path).name

    # Store each chunk + embedding
    for i, (chunk, embedding) in enumerate(zip(chunks, embeddings)):
        storage.add_chunk(
            text=chunk,
            embedding=embedding,
            document_name=document_name,
            chunk_index=i
        )
    storage.register_document(document_name, num_chunks=len(chunks))

    print(f"Processed and stored {len(chunks)} chunks from '{document_name}'.")
