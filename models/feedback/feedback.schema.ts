import { Document, Schema, Types } from 'mongoose';

export interface FeedbackSchema extends Document {
  contents: string;
  authorId: string;
  score: number;
  version: string;
  createdAt: Date;
}

export const feedbackSchema = new Schema({
  contents: String,
  authorId: {
    type: Types.ObjectId,
    required: true,
    ref: 'User'
  },
  score: {
    type: Number,
    required: true
  },
  version: {
    type: String,
    match: /^v\d+\.\d+\.\d+$/,
    required: true
  }
}, { timestamps: true });

