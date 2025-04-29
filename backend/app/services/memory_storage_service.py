from typing import List, Dict, Any
import uuid

class MemoryStorageService:
    """
    In-memory storage for text chunks and their embeddings.
    """

    def __init__(self) -> None:
        self.storage: List[Dict[str, Any]] = []

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

