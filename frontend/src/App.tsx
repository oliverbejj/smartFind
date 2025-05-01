import UploadForm from "./components/UploadForm";
//import SearchForm from "./components/SearchForm";
import AnswerForm from "./components/AnswerForm";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">SmartFind</h1>
      <UploadForm />
      <AnswerForm />
      {/*<SearchForm />*/}
    </div>
  );
}

export default App;
