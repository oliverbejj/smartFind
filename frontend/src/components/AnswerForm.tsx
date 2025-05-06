import { forwardRef, useImperativeHandle, useState } from "react";
import { AnswerService } from "../api-client";
import { ChatMessageOut } from "../api-client/models/ChatMessageOut";
import { AnswerRequest } from "../api-client/models/AnswerRequest";

type Props = {
  chatId: string;
  onMessage: (msg: ChatMessageOut) => void;
};

export type AnswerFormHandle = { reset: () => void };

const AnswerForm = forwardRef<AnswerFormHandle, Props>(
  ({ chatId, onMessage }, ref) => {
    const [question, setQuestion] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useImperativeHandle(ref, () => ({
      reset() {
        setQuestion("");
        setError("");
      },
    }));

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!question.trim()) return;

      setLoading(true);
      setError("");

      try {
        const payload: AnswerRequest = {
          query: question,
          top_k: 3,
          chat_session_id: chatId,
        } as unknown as AnswerRequest;

        const res = await AnswerService.generateAnswerAnswerPost(payload);
        onMessage({
          id: res.id,
          question: res.question,
          answer: res.answer,
          created_at: res.created_at,
          sources: res.sources,
        } as ChatMessageOut);

        setQuestion("");
      } catch (err) {
        console.error(err);
        setError("❌ Failed to generate answer.");
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
              ${
                !question.trim() && !loading
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
          >
            {loading ? "Thinking…" : "Send"}
          </button>
        </div>
        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
      </form>
    );
  },
);

export default AnswerForm;
