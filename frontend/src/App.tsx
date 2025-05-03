import { useState, useEffect } from "react";
import UploadForm from "./components/UploadForm";
import DocumentList from "./components/DocumentList";
import AnswerForm from "./components/AnswerForm";
import { DocumentsService } from "./api-client";
import { DocumentOut } from "./api-client";



function App() {
  const [documents, setDocuments] = useState<DocumentOut[]>([]);

  const fetchDocuments = async () => {
    const docs = await DocumentsService.listDocumentsDocumentsGet();
    setDocuments(docs);
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
