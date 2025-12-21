import express from "express";
import { deleteNote, getAllNotes, updateNote, createNote } from "../controllers/notescontrollers.js";

const router = express.Router();

router.get("/", getAllNotes);
router.get("/:id", getAllNotes);

router.post("/", createNote);

router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;

