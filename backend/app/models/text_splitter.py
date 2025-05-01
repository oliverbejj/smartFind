import re
from typing import List

def split_text_into_chunks(text: str, max_chunk_chars: int = 500) -> List[str]:
    """
    Splits text into sentence-based chunks, with a fallback to character chunks
    if sentences are too long or punctuation is missing.

    Args:
        text (str): The input text.
        max_chunk_chars (int): Max characters per chunk. Default is 500.

    Returns:
        List[str]: A list of clean, size-bounded text chunks.
    """

    # Use regex to split by sentence punctuation
    sentences = re.split(r'(?<=[.!?])\s+', text.strip())

    chunks: List[str] = []
    current_chunk = ""

    for sentence in sentences:
        # If sentence is way too long, chunk it manually
        if len(sentence) > max_chunk_chars:
            for i in range(0, len(sentence), max_chunk_chars):
                chunks.append(sentence[i:i+max_chunk_chars].strip())
            continue

        # Otherwise, group sentences
        if len(current_chunk) + len(sentence) <= max_chunk_chars:
            current_chunk += " " + sentence
        else:
            if current_chunk:
                chunks.append(current_chunk.strip())
            current_chunk = sentence

    if current_chunk:
        chunks.append(current_chunk.strip())

    return chunks
