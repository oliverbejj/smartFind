import { app__routers__document_router__DocumentOut as DocumentOut } from "../api-client/models/app__routers__document_router__DocumentOut";



type DocumentListProps = {
  documents: DocumentOut[];
  onDelete: (id: string) => void;
};

function DocumentList({ documents, onDelete }: DocumentListProps) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow max-w-md mx-auto mb-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Uploaded Documents</h2>

      {documents.length === 0 ? (
        <p className="text-gray-500">No documents uploaded yet.</p>
      ) : (
        <ul className="space-y-3">
          {documents.map((doc) => (
            <li
            key={doc.id}
            className="border border-gray-200 bg-gray-50 rounded-lg p-4 text-sm flex justify-between items-center hover:shadow-sm transition-shadow"
          >
            <div>
              <div className="text-gray-800 font-medium truncate">{doc.name}</div>
              <div className="text-gray-500 text-xs">{doc.chunk_count} chunks</div>
            </div>
          
            <button
              onClick={() => onDelete(doc.id)}
              className="text-red-500 hover:text-red-700 text-xs"
            >
              X
            </button>
          </li>
          
          ))}
        </ul>
      )}
    </div>
  );
}

export default DocumentList;
