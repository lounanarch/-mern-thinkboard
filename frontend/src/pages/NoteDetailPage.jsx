import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Loader2Icon, Trash2Icon, ArrowLeftIcon } from "lucide-react";

import api from "../lib/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // <-- this is necessary


 // must exist at src/api/index.js or src/api.js

const NoteDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch the note");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete note");
    }
  };

  const handleSave = async () => {
    if (!note?.title?.trim() || !note?.content?.trim()) {
      toast.error("Please add a title and content");
      return;
    }

    setSaving(true);
    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Note updated successfully");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update note");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <Loader2Icon className="animate-spin h-10 w-10" />
      </div>
    );
  }

  if (!note) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <p>Note not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <Link to="/" className="btn btn-ghost flex items-center gap-2">
            <ArrowLeftIcon className="h-5 w-5" />
            Back to notes
          </Link>

          <button
            onClick={handleDelete}
            className="btn btn-error btn-outline flex items-center gap-2"
          >
            <Trash2Icon className="h-5 w-5" />
            Delete note
          </button>
        </div>

        <div className="card bg-base-100">
          <div className="card-body">
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                value={note.title}
                onChange={(e) =>
                  setNote({ ...note, title: e.target.value })
                }
              />
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Content</span>
              </label>
              <textarea
                className="textarea textarea-bordered h-32"
                value={note.content}
                onChange={(e) =>
                  setNote({ ...note, content: e.target.value })
                }
              />
            </div>

            <div className="card-actions justify-end">
              <button
                className="btn btn-primary"
                disabled={saving}
                onClick={handleSave}
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
