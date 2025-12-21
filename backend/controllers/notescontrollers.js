import Note from "../models/Note.js";

export async function getAllNotes(req, res) {
    try {
        const notes = await Note.find().sort({ createdAt: -1 });
        res.status(200).json(notes);
    } catch (error) {
        console.error("error in getallnotes controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function createNote(req, res) {
    try {
        const { title, content } = req.body;

        // validate input
        if (!title || !content) {
            return res.status(400).json({ message: "Title and content are required" });
        }

        const newNote = new Note({ title, content });

        // FIX: save using the correct variable
        const savedNote = await newNote.save();

        res.status(201).json({
            message: "Note created successfully",
            note: savedNote
        });
    } catch (error) {
        console.error("error in createNote controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function updateNote(req, res) {
   try {
    const { title, content} = req.body;
 const updatedNote = await Note.findByIdAndUpdate(
  req.params.id,
  { title, content },
  { new: true }
);


   if(!updatedNote) return res.status(404).json({message: "note not found"})
    res.status(200).json({message: updatedNote});
   }catch (error) {
    console.error("error in updateNote controller", error);
    res.status(500).json({message: "internal server error"})
   }
}

export async function getNotebyId(req,res) {
    try {
        const note = await Note.findById(req.params.id);
        if(!note) return res.status(404).json({ message: "note not found!"});
        res.json(note);

    } catch (error) {
    console.error("error in updateNote controller", error);
    res.status(500).json({message: "internal server error"})
    }
}

export async function deleteNote(req, res) {
   try {
    const deleteNote = await Note.findByIdAndDelete(req.params.id)
    if(!deleteNote) return res.status(404).json({ message: "note not found"});
    res.status(200).json({message: "note deleted successfully"})
   } catch (error) {
    console.error("error in updateNote controller", error);
    res.status(500).json({message: "internal server error"})
   }
}
