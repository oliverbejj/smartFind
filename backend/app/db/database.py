from sqlalchemy import create_engine # type: ignore
from sqlalchemy.orm import sessionmaker   # type: ignore
from app.db.models import Base
from app.core.config import settings

engine = create_engine(settings.DATABASE_URL, pool_pre_ping=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def init_db() -> None:
    Base.metadata.create_all(bind=engine)
