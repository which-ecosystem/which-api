import { Document, Schema, Types } from 'mongoose';

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
  vote: (userId: string, which: 'left' | 'right') => PollSchema;
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

