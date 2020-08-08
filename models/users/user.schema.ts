import { Document, Schema } from 'mongoose';
import { User } from 'which-types';

export interface UserSchema extends Document, Omit<User, '_id'> {
  password: string;
}

export const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  email: String,
  verified: {
    type: Boolean,
    default: false
  },
  avatarUrl: {
    type: String,
    required: false
  },
  age: {
    type: Number,
    required: false
  }
}, { timestamps: true });

