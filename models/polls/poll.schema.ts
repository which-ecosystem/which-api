import { Document, Schema, Types } from 'mongoose';

interface ImageData {
  url: string;
  votes: number;
}

export interface PollSchema extends Document {
  authorId: string;
  contents: {
    left: ImageData;
    right: ImageData;
  };
}


const imageDataSchema = {
  url: String,
  votes: Number
}

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

