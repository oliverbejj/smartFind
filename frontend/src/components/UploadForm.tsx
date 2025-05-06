import { useRef, useState } from "react";
import { UploadService } from "../api-client";

type UploadFormProps = {
  onUploadSuccess: () => void;
  chatId: string;
};

/** Tiny “+” button that uploads immediately after file selection */
function UploadForm({ onUploadSuccess, chatId }: UploadFormProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      /* the OpenAPI client transforms this object to multipart/form‑data */
      await UploadService.uploadDocumentUploadPost(chatId, { file } as any);
      onUploadSuccess();
    } catch (err) {
      console.error("Upload failed", err);
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
