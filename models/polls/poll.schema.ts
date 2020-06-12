import { Document, Schema, Types } from 'mongoose';
import { User } from '../users/user.schema';

export interface ImageData {
  url: string;
  votes: number;
}

export interface Poll {
  author: User;
  contents: {
    left: ImageData;
    right: ImageData;
  };
}

export interface PollSchema extends Document, Omit<Poll, 'author'> {
  authorId: string;
}


const imageDataSchema = {
  url: String,
  votes: Number
};

export const pollSchema = new Schema({
  contents: {
    left: imageDataSchema,
    right: imageDataSchema
  },
  authorId: {
    type: Types.ObjectId,
    ref: 'User'
  }
});

