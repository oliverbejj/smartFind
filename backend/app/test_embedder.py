from backend.app.models.embedder import generate_embeddings

def main() -> None:
    # Small test chunks
    chunks = [
        "Photosynthesis is the process by which plants convert sunlight into chemical energy.",
        "In physics, energy is the quantitative property that must be transferred to an object to perform work on it."
    ]

    # Generate embeddings
    embeddings = generate_embeddings(chunks)

    # Print results
    print(f"Generated {len(embeddings)} embeddings.\n")

    for i, emb in enumerate(embeddings, start=1):
        print(f"--- Embedding {i} ---")
        print(f"Length: {len(emb)} dimensions")
        print(f"First 5 values: {emb[:5]}")
        print("-" * 40)

if __name__ == "__main__":
    main()

