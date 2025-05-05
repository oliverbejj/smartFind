import os
from dotenv import load_dotenv

load_dotenv()                       # loads .env if present

class Settings:
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL",
        "postgresql+psycopg2://smartfind:smartfind@db/smartfind",
    )
    OPENAI_API_KEY: str | None = os.getenv("OPENAI_API_KEY")

    def __post_init__(self):
        if not self.OPENAI_API_KEY:
            raise ValueError("OPENAI_API_KEY is missing.")

settings = Settings()
