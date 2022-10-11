import mongoose from 'mongoose';

export const DocumentSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    fileId: { type: String, required: true },
  },
  { timestamps: true },
);
