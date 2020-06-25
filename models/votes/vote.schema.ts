import { Document, Schema, Types } from 'mongoose';
import { Vote } from 'which-types';

export interface VoteSchema extends Document, Omit<Vote, '_id'> {
  password: string;
}

export const voteSchema = new Schema({
  userId: {
    type: Types.ObjectId,
    ref: 'user'
  },
  pollId: {
    type: Types.ObjectId,
    ref: 'poll'
  },
  which: {
    type: String,
    match: /left|right/g
  }
}, { timestamps: true });

