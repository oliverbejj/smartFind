import UploadForm from "./components/UploadForm";
import SearchForm from "./components/SearchForm";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">SmartFind</h1>
      <UploadForm />
      <SearchForm />
    </div>
  );
}

export default App;
