import { Document, Schema, Types } from 'mongoose';
import { Vote } from 'which-types';

export interface VoteSchema extends Document, Omit<Vote, '_id'> {}

export const voteSchema = new Schema({
  authorId: {
    type: Types.ObjectId,
    ref: 'user',
    required: true
  },
  pollId: {
    type: Types.ObjectId,
    ref: 'poll',
    required: true
  },
  which: {
    type: String,
    enum: ['left', 'right'],
    required: true
  }
}, { timestamps: true });

