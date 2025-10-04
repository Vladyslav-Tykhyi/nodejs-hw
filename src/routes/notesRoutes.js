import { Router } from 'express';
import {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNote,
} from '../controllers/notesController.js';

const router = Router();

router.get('/', getAllNotes);

router.get('/:noteId', getNoteById);

router.post('/', createNote);

router.delete('/:noteId', deleteNote);

router.patch('/:noteId', updateNote);

export default router;
