from dotenv import load_dotenv
import os

load_dotenv()  # It looks for `.env` at project root automatically

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

if not OPENAI_API_KEY:
    raise ValueError("OPENAI_API_KEY is missing. Please check your .env file.")


class Settings:
    DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./data/db.sqlite3")

settings = Settings()

