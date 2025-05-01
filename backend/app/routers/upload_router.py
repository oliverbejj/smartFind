from fastapi import APIRouter, UploadFile, File, HTTPException # type: ignore
from fastapi.responses import JSONResponse # type: ignore
from app.services.document_processing_service import process_document
from app.services.memory_storage_service import MemoryStorageService
import shutil
from pathlib import Path

router = APIRouter()


memory_storage = MemoryStorageService()

UPLOAD_DIR = Path("/tmp/smartfind_uploads")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)


@router.post("/")
async def upload_document(file: UploadFile = File(...)):
    # Validate file type
    if file is None or not file.filename or not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")




    # Save uploaded file to /tmp
    file_path = UPLOAD_DIR / file.filename
    try:
        with open(file_path, "wb") as out_file:
            shutil.copyfileobj(file.file, out_file)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save file: {str(e)}")

    # Process the document
    try:
        process_document(str(file_path), memory_storage)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Document processing failed: {str(e)}")

    return JSONResponse(
        status_code=200,
        content={"message": f"Successfully processed '{file.filename}'."}
    )
