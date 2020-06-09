import { Document, Schema } from "mongoose"

export interface User extends Document {
  name: string;
  avatarUrl?: string;
  age?: number;
}

export const UserSchema = new Schema({
  name: String,
  avatarUrl: {
    type: String,
    required: false
  },
  age: {
    type: Number
  }
});

