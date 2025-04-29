from backend.app.services.memory_storage_service import MemoryStorageService
from backend.app.models.embedder import generate_embeddings
from typing import List

def main() -> None:
    # Step 1: Create memory storage
    storage = MemoryStorageService()

    # Step 2: Prepare fake chunks
    fake_chunks = [
        "Photosynthesis allows plants to convert sunlight into chemical energy.",
        "Energy is defined in physics as the capacity to do work.",
        "Basketball is a sport played between two teams of five players."
    ]

    # Step 3: Generate embeddings for chunks
    chunk_embeddings = generate_embeddings(fake_chunks)

    # Step 4: Store chunks and their embeddings
    for i, (chunk, embedding) in enumerate(zip(fake_chunks, chunk_embeddings)):
        storage.add_chunk(
            text=chunk,
            embedding=embedding,
            document_name="science_notes.pdf",
            chunk_index=i
        )

    # Step 5: Simulate user query
    user_query = "How do plants create energy?"

    # Step 6: Embed the query
    query_embedding = generate_embeddings([user_query])[0]  # [0] because generate_embeddings returns a list

    # Step 7: Search for the best match
    top_matches = storage.search_similar_chunks(query_embedding, top_k=1)

    # Step 8: Print the best match
    if top_matches:
        best_match = top_matches[0]
        print("\nBest Match Found:")
        print(f"Document: {best_match['document_name']}")
        print(f"Chunk Index: {best_match['chunk_index']}")
        print(f"Text: {best_match['text']}")
    else:
        print("\nNo matches found.")

if __name__ == "__main__":
    main()
