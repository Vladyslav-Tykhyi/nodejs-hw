import { Router } from 'express';
import {
  createNote,
  deleteNote,
  getNote,
  getNotesById,
  updateNote,
} from '../../src/controllers/notesController.js';

const router = Router();

router.get('/', getNote);

router.get('/:noteId', getNotesById);

router.post('/', createNote);

router.delete('/:noteId', deleteNote);

router.patch('/', updateNote);

export default router;
