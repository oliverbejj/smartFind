import fitz
from typing import List


def extract_text_from_pdf(file_path: str) -> List[str]:
    """
    Extracts text from a PDF file page-by-page.

    Args:
        file_path (str): Path to the PDF file.

    Returns:
        List[str]: A list where each item is the text from one page.
    """
    # Open the PDF
    doc : fitz.Document = fitz.open(file_path)
    pages_text : List[str] = []

    # Loop through each page
    for page in doc:
        text : str = page.get_text()  # type: ignore
        pages_text.append(text)
    doc.close()

    return pages_text


