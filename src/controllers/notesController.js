import Note from '../models/note.js';
import createHttpError from 'http-errors';

export const getAllNotes = async (req, res) => {
  const { tag, search, page = 1, perPage = 10 } = req.query;

  const filter = {};

  if (tag) {
    filter.tag = { $regex: `^${tag}$`, $options: 'i' };
  }

  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { content: { $regex: search, $options: 'i' } },
    ];
  }

  const currentPage = parseInt(page);
  const itemsPerPage = parseInt(perPage);

  const skip = (currentPage - 1) * itemsPerPage;

  const [notes, totalNotes] = await Promise.all([
    Note.find(filter).skip(skip).limit(itemsPerPage),
    Note.countDocuments(filter),
  ]);

  const totalPages = Math.ceil(totalNotes / itemsPerPage);

  res.status(200).json({
    page: currentPage,
    perPage: itemsPerPage,
    totalNotes,
    totalPages,
    notes,
  });
};

export async function getNoteById(req, res, next) {
  try {
    const note = await Note.findById(req.params.noteId);
    if (!note) {
      return next(createHttpError(404, 'Note not found'));
    }
    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
}

export const createNote = async (req, res, next) => {
  try {
    const note = await Note.create(req.body);
    res.status(201).json(note);
  } catch (error) {
    next(error);
  }
};

export const deleteNote = async (req, res, next) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.noteId);
    if (!note) {
      return next(createHttpError(404, 'Note not found'));
    }
    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

export const updateNote = async (req, res, next) => {
  try {
    const note = await Note.findByIdAndUpdate(req.params.noteId, req.body, {
      new: true,
    });
    if (!note) {
      return next(createHttpError(404, 'Note not found'));
    }
    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};
