# SmartFind

**SmartFind** is an AI-powered document search engine that allows users to upload PDFs, extract and embed their contents, and perform semantic search through chat-based interactions. Built with FastAPI, PostgreSQL, OpenAI embeddings, and a React frontend.

---

## 🚀 Features

- 🔐 User Authentication with JWT
- 📄 PDF Upload and Processing
- 📚 Chunking and Embedding with OpenAI
- 💬 Chat Interface for Semantic Q&A
- 🧠 GPT-3.5 Turbo Answer Generation
- 🧾 Document and Chat Session Management
- 🌐 Fully containerized with Docker and Makefile automation

---

## 📦 Project Structure

```
.
├── backend/
|   ├── Dockerfile
│   ├── app/
│   │   ├── db/
│   │   │   ├── crud.py
│   │   │   ├── database.py
│   │   │   └── models.py
│   │   ├── models/
│   │   │   ├── embedder.py
│   │   │   ├── pdf_reader.py
│   │   │   └── text_splitter.py
│   │   ├── routers/
│   │   │   ├── answer_router.py
│   │   │   ├── auth_router.py
│   │   │   ├── chat_router.py
│   │   │   ├── document_router.py
│   │   │   ├── upload_router.py
│   │   │   └── health_router.py
│   │   ├── services/
│   │   │   └── db_storage_service.py
│   │   ├── core/
│   │   │   └── config.py
│   │   └── main.py
├── frontend/
│   ├── App.tsx
|   ├── Dockerfile
│   ├── components/
│   │   ├── AnswerForm.tsx
│   │   ├── AuthContext.tsx
│   │   ├── AuthModal.tsx
│   │   ├── ChatHistory.tsx
│   │   ├── ChatSidebar.tsx
│   │   ├── DocumentList.tsx
│   │   ├── SearchForm.tsx
│   │   └── UploadForm.tsx
├── docker-compose.yml
├── Makefile
└── README.md
```

---

## 🛠️ Getting Started

### Prerequisites

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Make](https://www.gnu.org/software/make/)

### Environment Variables

Create a `.env` file in the root with the following:

```
OPENAI_API_KEY=your_openai_api_key
JWT_SECRET_KEY=your_jwt_secret
DATABASE_URL=postgresql+psycopg2://smartfind:smartfind@db/smartfind
```

---

## 🔧 Running the Project

Simply run:

```
make up
```

This will:

- Build and start the FastAPI backend
- Serve the React frontend (typically on `http://localhost:5173`)
- Set up the PostgreSQL database with appropriate tables

---

## 🧪 API Endpoints

FastAPI Swagger UI is available at:

```
http://localhost:8000/docs
```

Includes endpoints for:

- `/auth` – Register/Login
- `/upload` – PDF Upload
- `/answer` – Semantic Question Answering
- `/documents` – List/Delete documents
- `/chats` – Manage sessions and messages
- `/health` – Health check

---

## 📋 Makefile Targets

| Command     | Description                       |
|-------------|-----------------------------------|
| `make up`   | Build and run full stack          |
| `make down` | Stop and remove containers        |

---

## 📄 License

MIT License

---

## 🧠 Acknowledgements

- [FastAPI](https://fastapi.tiangolo.com/)
- [OpenAI](https://openai.com/)
- [React](https://reactjs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- This readme was generated using ChatGPT 4o
