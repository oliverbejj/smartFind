from fastapi import FastAPI
from app.routers import upload_router, search_router, system_router

# Create FastAPI app
app = FastAPI(
    title="SmartFind",
    description="AI-powered document search engine.",
    version="1.0.0"
)

# Include routers
app.include_router(system_router.router, prefix="", tags=["System"])
app.include_router(upload_router.router, prefix="/upload", tags=["Upload"])
app.include_router(search_router.router, prefix="/search", tags=["Search"])
