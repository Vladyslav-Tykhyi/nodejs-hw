import Note from '../models/note.js';
import createHttpError from 'http-errors';

export const getAllNotes = async (req, res, next) => {
  try {
    const { tag, search, page = 1, perPage = 10 } = req.query;

    const currentPage = parseInt(page, 10);
    const itemsPerPage = parseInt(perPage, 10);
    const skip = (currentPage - 1) * itemsPerPage;

    let query = Note.find();

    if (tag) {
      query = query.where('tag').equals(tag);
    }

    if (search) {
      query = query.find({ $text: { $search: search } });
    }

    query = query.skip(skip).limit(itemsPerPage);

    const [notes, totalNotes] = await Promise.all([
      query.exec(),
      Note.countDocuments(
        tag && search
          ? { tag, $text: { $search: search } }
          : tag
          ? { tag }
          : search
          ? { $text: { $search: search } }
          : {},
      ),
    ]);

    const totalPages = Math.ceil(totalNotes / itemsPerPage);

    res.status(200).json({
      page: currentPage,
      perPage: itemsPerPage,
      totalNotes,
      totalPages,
      notes,
    });
  } catch (error) {
    next(createHttpError(500, error.message));
  }
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
