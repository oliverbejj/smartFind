from backend.app.models.pdf_reader import extract_text_from_pdf
from backend.app.models.text_splitter import split_text_into_chunks

pages = extract_text_from_pdf("backend/app/test_data/sample.pdf")
full_text = "\n".join(pages)

chunks = split_text_into_chunks(full_text)

print(f"Split into {len(chunks)} chunks.")
print("\n--- First chunk ---\n")
print(chunks[1])
