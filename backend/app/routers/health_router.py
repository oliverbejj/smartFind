from fastapi import APIRouter # type: ignore

router = APIRouter()

@router.get("")
async def health_check():
    return {"status": "ok"}
