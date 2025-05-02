type DocumentListProps = {
    documents: { name: string; num_chunks: number }[];
  };
  
  function DocumentList({ documents }: DocumentListProps) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow max-w-md mx-auto mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Uploaded Documents</h2>
  
        {documents.length === 0 ? (
          <p className="text-gray-500">No documents uploaded yet.</p>
        ) : (
          <ul className="space-y-3">
            {documents.map((doc) => (
              <li
                key={doc.name}
                className="border border-gray-200 bg-gray-50 rounded-lg p-4 text-sm flex justify-between items-center hover:shadow-sm transition-shadow"
              >
                <div className="text-gray-800 font-medium truncate">{doc.name}</div>
                <div className="text-gray-500 text-xs">{doc.num_chunks} chunks</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
  
  export default DocumentList;
  