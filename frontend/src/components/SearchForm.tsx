// This is outdated (I dont use it in the current version of the app), but keep it in case I want to use it in the future for citing sources or something






















import { useState } from "react";
import axios from "axios";

type SearchResult = {
  document_name: string;
  chunk_index: number;
  text: string;
  score: number;
};

function SearchForm() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!query.trim()) {
      setMessage("Please enter a search query.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/search/", {
        query: query,
        top_k: 5,
      });

      setResults(response.data);
      setMessage(`Found ${response.data.length} results.`);
    } catch (error) {
      setMessage("Search failed.");
      setResults([]);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow max-w-md mx-auto my-8">
      <h2 className="text-xl font-bold mb-4">Semantic Search</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type your search query..."
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Search
        </button>
      </form>

      {message && <p className="mt-4 text-sm text-gray-700">{message}</p>}

      <ul className="mt-6 space-y-4">
        {results.map((result, index) => (
          <li key={index} className="border p-4 rounded bg-gray-50">
            <p className="text-sm text-gray-500">
              {result.document_name} — chunk #{result.chunk_index} — score: {result.score.toFixed(2)}
            </p>
            <p className="text-gray-800">{result.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchForm;
