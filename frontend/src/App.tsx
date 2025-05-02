import { useState, useEffect } from "react";
import UploadForm from "./components/UploadForm";
import DocumentList from "./components/DocumentList";
import AnswerForm from "./components/AnswerForm";
import axios from "axios";

function App() {
  const [documents, setDocuments] = useState([]);

  const fetchDocuments = async () => {
    const res = await axios.get("http://localhost:8000/documents");
    setDocuments(res.data);
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">SmartFind</h1>
      <UploadForm onUploadSuccess={fetchDocuments} />
      <DocumentList documents={documents} />
      <AnswerForm />
    </div>
  );
}

export default App;
