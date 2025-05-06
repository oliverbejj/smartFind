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

const AnswerForm = forwardRef<AnswerFormHandle, AnswerFormProps>(
  ({ chatId, onMessage }, ref) => {
    const [question, setQuestion] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useImperativeHandle(ref, () => ({
      reset: () => {
        setQuestion("");
        setError("");
      },
    }));

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!question.trim() || !chatId) return;

      setLoading(true);
      setError("");

      try {
        const response = await axios.post<ChatMessageOut>(
          "http://localhost:8000/answer/",
          {
            query: question,
            top_k: 3,
            chat_session_id: chatId,
          }
        );

        const newMessage = response.data;
        onMessage(newMessage);
        setQuestion("");
      } catch (err) {
        console.error(err);
        setError("❌ Failed to generate answer. Try again.");
      } finally {
        setLoading(false);
      }
    };

    return (
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex items-center border rounded-full px-4 py-2 bg-white shadow-md">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Type your question..."
            disabled={loading}
            className="flex-1 outline-none bg-transparent text-sm px-2 py-1"
          />

          <button
            type="submit"
            disabled={loading || !question.trim()}
            className={`ml-2 text-white rounded-full px-4 py-1.5 text-sm font-medium transition-colors
              ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }
              ${!question.trim() && !loading ? "opacity-50 cursor-not-allowed" : ""}
            `}
          >
            {loading ? "Thinking..." : "Send"}
          </button>
        </div>

        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
      </form>
    );
  }
);

export default AnswerForm;
