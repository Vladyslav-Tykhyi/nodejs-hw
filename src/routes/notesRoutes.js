import { Router } from 'express';
import {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNote,
} from '../controllers/notesController.js';
import { celebrate } from 'celebrate';
import {
  noteIdSchema,
  createNoteSchema,
  getAllNotesSchema,
  updateNoteSchema,
} from '../middleware/validations/notesValidation.js';

const router = Router();

router.get('/', celebrate(getAllNotesSchema), getAllNotes);

router.get('/:noteId', celebrate(noteIdSchema), getNoteById);

router.post('/', celebrate(createNoteSchema), createNote);

router.delete('/:noteId', celebrate(noteIdSchema), deleteNote);

router.patch('/:noteId', celebrate(updateNoteSchema), updateNote);

export default router;
