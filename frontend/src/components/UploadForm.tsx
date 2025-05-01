import { useState } from "react";
import axios from "axios";

function UploadForm() {
  // state to track selected file
  const [file, setFile] = useState<File | null>(null);

  // state for showing response messages
  const [message, setMessage] = useState<string | null>(null);

  // when the file input changes
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    setFile(uploadedFile || null);
  };

  // when the user submits the form
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // prevent page reload

    if (!file) {
      setMessage("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:8000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage(`${response.data.message}`);
    } catch (error: any) {
      setMessage("Upload failed. Check backend or file format.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow max-w-md mx-auto my-8">
      <h2 className="text-xl font-bold mb-4">Upload a PDF</h2>

      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        className="mb-4"
      />

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Upload
      </button>

      {message && (
        <div className="mt-4 text-sm text-gray-700">
          {message}
        </div>
      )}
    </form>
  );
}

export default UploadForm;
