import Note from '../models/note.js';
import createHttpError from 'http-errors';

export async function getNote(req, res) {
  const note = await Note.find();
  console.log(note);
  res.status(200).json(note);
}

export async function getNotesById(req, res, next) {
  const noteId = req.params.noteId;
  const note = await Note.findById(noteId);
  if (!note) {
    next(createHttpError(404, 'Student not found'));
    return;
  }
  res.status(200).json(note);
}

export const createNote = async (req, res) => {
  const note = await Note.create(req.body);
  res.status(201).json(note);
};

export const deleteNote = async (req, res, next) => {
  const { noteId } = req.params;
  const note = await Note.findOneAndDelete({
    _id: noteId,
  });

  if (!note) {
    next(createHttpError(404, 'Student not found'));
    return;
  }

  res.status(200).send(note);
};

export const updateNote = async (req, res, next) => {
  const { noteId } = req.params;

  const note = await Note.findOneAndUpdate({ _id: noteId }, req.body, {
    new: true,
  });

  if (!note) {
    next(createHttpError(404, 'Student not found'));
    return;
  }

  res.status(200).json(note);
};
