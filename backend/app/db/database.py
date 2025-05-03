from sqlalchemy import create_engine # type: ignore
from sqlalchemy.orm import sessionmaker # type: ignore
from app.db.models import Base
from app.core.config import settings  # type: ignore

# SQLite for now
SQLALCHEMY_DATABASE_URL = settings.DATABASE_URL  # e.g., sqlite:///./db.sqlite3

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False} if SQLALCHEMY_DATABASE_URL.startswith("sqlite") else {}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def init_db():
    Base.metadata.create_all(bind=engine)
