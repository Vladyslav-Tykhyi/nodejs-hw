import { Schema, model } from 'mongoose';

import { TAGS } from '../constants/tags.js';

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      default: '',
      trim: true,
      required: false,
    },
    tag: {
      type: String,
      enum: [...TAGS],
      default: 'Todo',
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

noteSchema.index({ title: 'text', content: 'text' });

const Note = model('Note', noteSchema);

export default Note;
