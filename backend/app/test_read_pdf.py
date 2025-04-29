from backend.app.models.pdf_reader import extract_text_from_pdf

from pathlib import Path


def main() -> None:
    # Set path to the sample PDF
    pdf_path = Path("backend/app/test_data/sample.pdf")

    # Make sure the file exists before processing
    if not pdf_path.exists():
        print(f"❌ File not found: {pdf_path}")
        return

    # Extract text from PDF
    pages = extract_text_from_pdf(str(pdf_path))

    # Print each page's text
    for i, page_text in enumerate(pages, start=1):
        print(f"\n--- Page {i} ---")
        print(page_text)
        print("-" * 40)


if __name__ == "__main__":
    main()
