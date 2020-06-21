import { Document, Schema } from 'mongoose';
import { User } from 'which-types';

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

