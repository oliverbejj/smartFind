from fastapi import APIRouter, UploadFile, File, HTTPException, Query # type: ignore
from fastapi.responses import JSONResponse # type: ignore
from app.services.db_storage_service import DBStorageService
import shutil
from pathlib import Path
from uuid import UUID

router = APIRouter()




UPLOAD_DIR = Path("/tmp/smartfind_uploads")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

storage = DBStorageService()

@router.post("/")
async def upload_document(
    file: UploadFile = File(...),
    chat_session_id: UUID = Query(...)
):
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
        storage.process_and_store(str(file_path), chat_session_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Processing failed: {str(e)}")

    return JSONResponse(
        status_code=200,
        content={"message": f"Successfully processed '{file.filename}'."}
    )
