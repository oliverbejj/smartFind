import { useState, forwardRef, useImperativeHandle } from "react";
import axios from "axios";
import { ChatMessageOut } from "../api-client/models/ChatMessageOut";


type AnswerFormProps = {
  chatId: string;
  onMessage: (msg: ChatMessageOut) => void;
};

export type AnswerFormHandle = {
  reset: () => void;
};

const AnswerForm = forwardRef<AnswerFormHandle, AnswerFormProps>(({ chatId, onMessage }, ref) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useImperativeHandle(ref, () => ({
    reset: () => {
      setQuestion("");
      setAnswer("");
      setError("");
    },
  }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || !chatId) return;

    setLoading(true);
    setAnswer("");
    setError("");

    try {
      const response = await axios.post<ChatMessageOut>("http://localhost:8000/answer/", {
        query: question,
        top_k: 3,
        chat_session_id: chatId,
      });
      
      const newMessage = response.data;
      setAnswer(newMessage.answer);
      setQuestion("");
      
      onMessage(newMessage);
      
      const answer = response.data.answer;
      setAnswer(answer);
      setQuestion("");


    } catch (err: any) {
      setError("❌ Failed to generate answer. Try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow max-w-md mx-auto my-8 flex flex-col gap-4"
    >
      <h2 className="text-xl font-semibold">Smart Answer</h2>

      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask a question..."
        disabled={loading}
        className="p-2 border border-gray-300 rounded w-full"
      />

      <button
        type="submit"
        disabled={loading}
        className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-white font-medium ${
          loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {loading && (
          <svg
            className="w-4 h-4 animate-spin"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            />
          </svg>
        )}
        {loading ? "Thinking..." : "Ask"}
      </button>

      {error && <p className="text-red-600 text-sm">{error}</p>}
      {answer && (
        <div className="p-4 bg-gray-50 border rounded text-gray-800 whitespace-pre-line">
          {answer}
        </div>
      )}
    </form>
  );
});

export default AnswerForm;
