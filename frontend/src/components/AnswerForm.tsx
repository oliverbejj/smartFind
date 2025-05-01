import { useState } from "react";
import axios from "axios";

function AnswerForm() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
    setAnswer("");
    setError("");

    try {
      const response = await axios.post("http://localhost:8000/answer/", {
        query: question,
        top_k: 3
      });

      setAnswer(response.data.answer);
    } catch (err: any) {
      setError("❌ Failed to generate answer. Try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow max-w-md mx-auto my-8">
      <h2 className="text-xl font-bold mb-4">Smart Answer</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a question..."
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {loading ? "Thinking..." : "Ask"}
        </button>
      </form>

      {error && <p className="text-red-600 mt-4">{error}</p>}
      {answer && (
        <div className="mt-6 p-4 bg-gray-50 border rounded">
          <p className="text-gray-800 whitespace-pre-line">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default AnswerForm;
