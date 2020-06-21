import { Document, Schema, Types } from 'mongoose';
import { User } from '../users/user.schema';

export interface ImageData {
  url: string;
  votes: number;
}

export interface Poll {
  _id: string;
  author: User;
  contents: {
    left: ImageData;
    right: ImageData;
  };
}

export interface ImageDataSchema {
  url: string;
  votes: string[];
}

export interface PollSchema extends Document {
  contents: {
    left: ImageDataSchema;
    right: ImageDataSchema;
  };
  authorId: string;
}

export const imageDataSchema = {
  url: String,
  votes: [Types.ObjectId]
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

