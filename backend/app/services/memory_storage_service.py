from typing import List, Dict, Any
import uuid
import math


# Singleton: ACTUALLY USING SOMETHING UNIVERSITY TAUGHT ME LMAO
class MemoryStorageService:
    """
    In-memory storage for text chunks and their embeddings.
    """
    _instance = None
    storage: List[Dict[str, Any]]
    

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(MemoryStorageService, cls).__new__(cls)
            cls._instance.storage = []
        return cls._instance

    def add_chunk(
        self,
        text: str,
        embedding: List[float],
        document_name: str,
        chunk_index: int
    ) -> str:
        """
        Adds a chunk entry to the storage.

        Args:
            text (str): The text chunk.
            embedding (List[float]): The embedding vector.
            document_name (str): Name of the document it came from.
            chunk_index (int): Index of the chunk in the document.

        Returns:
            str: The ID of the stored chunk.
        """
        entry = {
            "id": str(uuid.uuid4()),
            "text": text,
            "embedding": embedding,
            "document_name": document_name,
            "chunk_index": chunk_index
        }
        self.storage.append(entry)
        return entry["id"]

    def get_all_chunks(self) -> List[Dict[str, Any]]:
        """
        Returns all stored chunk entries.

        Returns:
            List[Dict[str, Any]]: List of stored chunk records.
        """
        return self.storage

    def clear(self) -> None:
        """
        Clears all stored data.
        """
        self.storage.clear()



    
    def search_similar_chunks(self, query_embedding: List[float], top_k: int = 1) -> List[Dict[str, Any]]:
        """
        Searches for the top_k most similar stored chunks to the query embedding.

        Args:
            query_embedding (List[float]): The embedding vector for the search query.
            top_k (int): Number of top results to return.

        Returns:
            List[Dict[str, Any]]: List of the top_k most similar chunk entries.
        """
        if not self.storage:
            return []

        # Compute similarity between query and each stored embedding
        scored_chunks = []

        for entry in self.storage:
            similarity = self._cosine_similarity(query_embedding, entry["embedding"])
            scored_chunks.append((similarity, entry))

        # Sort by highest similarity score
        scored_chunks.sort(key=lambda x: x[0], reverse=True)

        # Return the top_k entries
        top_matches = [entry for _, entry in scored_chunks[:top_k]]
        return top_matches


    def _cosine_similarity(self, vec1: List[float], vec2: List[float]) -> float:
        """
        Computes the cosine similarity between two vectors.

        Args:
            vec1 (List[float])
            vec2 (List[float])

        Returns:
            float: Cosine similarity score.
        """
        dot_product = sum(a * b for a, b in zip(vec1, vec2))
        magnitude_vec1 = math.sqrt(sum(a * a for a in vec1))
        magnitude_vec2 = math.sqrt(sum(b * b for b in vec2))

        if magnitude_vec1 == 0 or magnitude_vec2 == 0:
            return 0.0

        return dot_product / (magnitude_vec1 * magnitude_vec2)
