from fastapi import FastAPI # type: ignore
from app.routers import upload_router, answer_router, document_router, chat_router, health_router
from app.db.database import init_db


app = FastAPI(
    title="SmartFind",
    description="AI-powered document search engine.",
    version="1.0.0"
)

init_db()


from fastapi.middleware.cors import CORSMiddleware # type: ignore

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



app.include_router(health_router.router, prefix="/health", tags=["Health"])
app.include_router(upload_router.router, prefix="/upload", tags=["Upload"])
app.include_router(answer_router.router, prefix="/answer", tags=["Answer"])
app.include_router(document_router.router, prefix="/documents", tags=["Documents"])
app.include_router(chat_router.router, prefix="/chats", tags=["Chats"])
