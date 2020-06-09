import { Document, Schema, Types } from 'mongoose';
import { User } from '../users/user.schema';

interface ImageData {
  url: string;
  votes: number;
}

export interface Poll extends Document {
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

export const PollSchema = new Schema({
  contents: {
    left: imageDataSchema,
    right: imageDataSchema
  },
  authorId: { 
    type: Types.ObjectId,
    ref: 'User'
  }
});

