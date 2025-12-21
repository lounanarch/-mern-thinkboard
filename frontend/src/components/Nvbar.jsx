import React from "react";
import { Link } from "react-router-dom";
import { PlusIcon } from "lucide-react";

const Nvbar = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="mx-auto max-w-6xl px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-blue-600 font-mono tracking-tight">
            think board
          </h1>
          <Link
            to="/create"
            className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-700 transition"
          >
            <PlusIcon className="h-5 w-5" />
            <span>New Note</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Nvbar;
