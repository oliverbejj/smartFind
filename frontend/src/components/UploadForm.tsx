import { useRef, useState } from "react";
import axios from "axios";

type UploadFormProps = {
  onUploadSuccess: () => void;
  chatId: string;
};

/**
 * Compact “+” button that uploads a PDF immediately after the user
 * picks a file (no second confirmation needed).
 */
function UploadForm({ onUploadSuccess, chatId }: UploadFormProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const handleFileSelect = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file || !chatId) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post(
        `http://localhost:8000/upload/?chat_session_id=${chatId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      onUploadSuccess();           // refresh doc list
    } catch {
      console.error("Upload failed");
    } finally {
      setLoading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <label
      className={`cursor-pointer inline-flex items-center justify-center w-8 h-8 rounded-full text-xl font-bold transition
        ${loading ? "bg-gray-300 cursor-wait" : "bg-blue-100 hover:bg-blue-200"}`}
      title={loading ? "Uploading…" : "Upload PDF"}
    >
      {loading ? "…" : "+"}
      <input
        ref={inputRef}
        type="file"
        accept=".pdf"
        onChange={handleFileSelect}
        disabled={loading}
        className="hidden"
      />
    </label>
  );
}

export default UploadForm;
