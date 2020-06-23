import { Document, Schema } from 'mongoose';
import { User } from 'which-types';

export interface UserSchema extends Document, Omit<User, '_id'> {
  password: string;
}

export const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  avatarUrl: {
    type: String,
    required: false
  },
  age: {
    type: Number,
    required: false
  }
}, { timestamps: true });

