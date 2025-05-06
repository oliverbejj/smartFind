# 🧠 SmartFind — AI-Powered Document Q&A App

SmartFind is a full-stack AI application that lets users upload PDF documents and interact with them via natural language questions. It extracts, embeds, and indexes document content using semantic search, then returns clear, GPT-generated answers based on the most relevant text chunks.

Built for developers and learners who want real-world AI, backend, and frontend experience — from embeddings to user conversations.

---

## ✨ Features

- 📄 **Upload PDFs** and have them processed into searchable chunks
- 💬 **Ask natural language questions** and get relevant, clean answers
- 🧠 **Embeddings + semantic search** via OpenAI for accurate context retrieval
- 🗃️ **Chat sessions** with independent histories and context
- ⚡ **React + Tailwind frontend** with dynamic chat & document UI
- 🐍 **FastAPI backend** with OpenAPI integration and SQLAlchemy ORM
- 🐳 **One-command Docker setup** via `make up`
- 🔐 Ready for future features like auth, multi-user support, and more

---

## 🧱 Tech Stack

| Layer       | Tech                             |
|-------------|----------------------------------|
| **Frontend**  | React, Vite, TailwindCSS, Axios |
| **Backend**   | FastAPI, SQLAlchemy, OpenAPI    |
| **AI / Search** | OpenAI Embeddings, cosine similarity |
| **DB**        | Postgres |
| **Infra**     | Docker, Makefile                |

---

## 🧠 How It Works

1. **Upload a PDF**  
   → Extracted + split into sentences or chunks (max characters)

2. **Embed with OpenAI**  
   → Chunks converted to embedding vectors and stored in DB

3. **Ask a question**  
   → User input embedded → top chunks found via cosine similarity

4. **Final GPT filter**  
   → Top chunk passed to GPT to polish and return clean answer

5. **Conversation memory**  
   → Each Q&A saved under a specific chat session, retrievable later

---

## 🚀 Getting Started

### 🔧 Prerequisites

- Docker
- OpenAI API key (`OPENAI_API_KEY` in `.env`)

### 🏁 Quickstart

```bash
make up
