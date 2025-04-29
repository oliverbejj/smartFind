from typing import List


# v1
def split_text_into_chunks(text: str, chunk_size: int = 500) -> List[str]:
    """
    Splits a large string of text into smaller chunks by word count.

    Args:
        text (str): The full text to split.
        chunk_size (int): Max number of words per chunk.

    Returns:
        List[str]: A list of text chunks.
    """
    words = text.split()
    chunks: List[str] = []

    for i in range(0, len(words), chunk_size):
        chunk = " ".join(words[i:i + chunk_size])
        chunks.append(chunk)

    return chunks