import { Document, Schema } from "mongoose"

export interface UserSchema extends Document {
  name: string;
  avatarUrl?: string;
  age?: number;
}

export const userSchema = new Schema({
  name: String,
  avatarUrl: {
    type: String,
    required: false
  },
  age: {
    type: Number
  }
});

