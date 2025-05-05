from openai import OpenAI # type: ignore
from app.core.config import settings
from typing import List

client = OpenAI(api_key=settings.OPENAI_API_KEY)

def generate_embeddings(
    chunks: List[str],
    model: str = "text-embedding-ada-002"
) -> List[List[float]]:
    """
    Generates vector embeddings for a list of text chunks.

    Args:
        chunks (List[str]): List of text chunks to embed.
        model (str): OpenAI embedding model to use.

    Returns:
        List[List[float]]: List of embeddings (one per chunk).
    """
    embeddings: List[List[float]] = []

    for chunk in chunks:
        response = client.embeddings.create(
            input=chunk,
            model=model
        )
        embedding : List[float] = response.data[0].embedding
        embeddings.append(embedding)

    return embeddings
