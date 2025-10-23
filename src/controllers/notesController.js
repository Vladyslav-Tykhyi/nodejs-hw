import Note from '../models/note.js';
import createHttpError from 'http-errors';

export const getAllNotes = async (req, res, next) => {
  try {
    const { tag, search, page = 1, perPage = 10 } = req.query;

    const currentPage = parseInt(page, 10);
    const itemsPerPage = parseInt(perPage, 10);
    const skip = (currentPage - 1) * itemsPerPage;

    const filter = { userId: req.user._id };

    if (tag) {
      filter.tag = tag;
    }

    if (search) {
      filter.$text = { $search: search };
    }

    const [notes, totalNotes] = await Promise.all([
      Note.find(filter).skip(skip).limit(itemsPerPage).exec(),
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
  } catch (error) {
    next(createHttpError(500, error.message));
  }
};

export const getNoteById = async (req, res, next) => {
  const { noteId } = req.params;
  try {
    const note = await Note.findOne({ _id: noteId, userId: req.user._id });
    if (!note) {
      return next(createHttpError(404, 'Note not found'));
    }
    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

export const createNote = async (req, res, next) => {
  try {
    const note = await Note.create({ ...req.body, userId: req.user._id });
    res.status(201).json(note);
  } catch (error) {
    next(error);
  }
};

export const deleteNote = async (req, res, next) => {
  const { noteId } = req.params;
  try {
    const note = await Note.findOneAndDelete({
      _id: noteId,
      userId: req.user._id,
    });
    if (!note) {
      return next(createHttpError(404, 'Note not found'));
    }
    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

export const updateNote = async (req, res, next) => {
  const { noteId } = req.params;
  try {
    const note = await Note.findOneAndUpdate(
      { _id: noteId, userId: req.user._id },
      req.body,
      { new: true },
    );
    if (!note) {
      return next(createHttpError(404, 'Note not found'));
    }
    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};
