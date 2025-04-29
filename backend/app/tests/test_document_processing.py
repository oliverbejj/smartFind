from backend.app.services.memory_storage_service import MemoryStorageService
from backend.app.services.document_processing_service import process_document
from backend.app.models.embedder import generate_embeddings



def main() -> None:
    # Create storage service
    storage = MemoryStorageService()

    # Path to your sample PDF (adjust if needed)
    pdf_path = "backend/app/test_data/sample.pdf"

    # Process the document fully (extract ➔ chunk ➔ embed ➔ store)
    process_document(file_path=pdf_path, storage=storage)

    # Print summary
    stored_chunks = storage.get_all_chunks()
    

    user_query : str = "What did the villagers do when they noticed no cats were left?"

    query_embedding = generate_embeddings([user_query])[0]

    top_matches = storage.search_similar_chunks(query_embedding=query_embedding, top_k=2)
   
   
    if top_matches:
        best_match = top_matches[0]
        print("\nSearch Result:")
        print(f"Document: {best_match['document_name']}")
        print(f"Chunk Index: {best_match['chunk_index']}")
        print(f"Matching Text: {best_match['text']}\n\n\n")
        best_match2 = top_matches[1]
        print(f"Document: {best_match2['document_name']}")
        print(f"Chunk Index: {best_match2['chunk_index']}")
        print(f"Matching Text: {best_match2['text']}")
    else:
        print("\nNo matching chunks found.")


    

if __name__ == "__main__":
    main()
