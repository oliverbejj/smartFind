from backend.app.services.memory_storage_service import MemoryStorageService
from typing import List

def main() -> None:
    # Create the memory storage instance
    storage = MemoryStorageService()

    # Fake data
    fake_chunks = [
        "Photosynthesis is the process by which plants convert sunlight into chemical energy.",
        "In physics, energy is the ability to do work or cause change."
    ]

    fake_embeddings: List[List[float]] = [
        [0.1, 0.2, 0.3],  # Normally embeddings have 1536 dimensions, but for test, short is fine
        [0.4, 0.5, 0.6]
    ]

    document_name = "sample_document.pdf"

    # Add chunks to storage
    for i, (chunk, embedding) in enumerate(zip(fake_chunks, fake_embeddings)):
        chunk_id = storage.add_chunk(
            text=chunk,
            embedding=embedding,
            document_name=document_name,
            chunk_index=i
        )
        print(f"Added chunk {i} with ID: {chunk_id}")

    # Retrieve all stored chunks
    all_chunks = storage.get_all_chunks()
    print(f"\nStored {len(all_chunks)} chunks:\n")

    for chunk in all_chunks:
        print(f"ID: {chunk['id']}")
        print(f"Document: {chunk['document_name']}")
        print(f"Chunk index: {chunk['chunk_index']}")
        print(f"Text preview: {chunk['text'][:50]}...")
        print(f"Embedding preview: {chunk['embedding'][:3]}...\n")
        print("-" * 40)

if __name__ == "__main__":
    main()
