import { Document, Schema } from 'mongoose';

export interface User {
  name: string;
  avatarUrl?: string;
  age?: number;
}

export interface UserSchema extends Document, User {
  password: string;
}

export const userSchema = new Schema({
  name: String,
  password: String,
  avatarUrl: {
    type: String,
    required: false
  },
  age: {
    type: Number
  }
});

