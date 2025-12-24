import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import NoteDetailPage from "./pages/NoteDetailPage";
import Nvbar from "./components/Nvbar";

const App = () => {
  return (
    <div className="relative h-full w-full" data-theme="forest">
      {/* Background */}
      <div className="absolute inset-0 -z-10 h-full w-full">
        <div className="h-full w-full [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]" />
      </div>

      {/* Navbar */}
      <Nvbar />

      {/* Buttons Section (optional for demo/testing) */}
      <div className="p-10 flex gap-4 flex-wrap">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-blue-700 active:scale-95 transition">
          Home
        </button>
        <button className="bg-gray-100 text-gray-800 px-6 py-3 rounded-xl font-semibold border border-gray-300 hover:bg-gray-200 active:scale-95 transition">
          About
        </button>
        <button className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-green-700 active:scale-95 transition">
          Notes
        </button>
        <button className="bg-red-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-red-700 active:scale-95 transition">
          Contact
        </button>
        <button className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 hover:text-white active:scale-95 transition">
          Career
        </button>
        <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:opacity-90 active:scale-95 transition">
          Team
        </button>
      </div>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />
      </Routes>
    </div>
  );
};

export default App;



