from fastapi import FastAPI # type: ignore
from app.routers import upload_router, search_router, system_router, answer_router

# Create FastAPI app
app = FastAPI(
    title="SmartFind",
    description="AI-powered document search engine.",
    version="1.0.0"
)



from fastapi.middleware.cors import CORSMiddleware # type: ignore

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Include routers
app.include_router(system_router.router, prefix="", tags=["System"])
app.include_router(upload_router.router, prefix="/upload", tags=["Upload"])
#app.include_router(search_router.router, prefix="/search", tags=["Search"]) ####Check router file to see why it's commented out 
app.include_router(answer_router.router, prefix="/answer", tags=["Answer"])
