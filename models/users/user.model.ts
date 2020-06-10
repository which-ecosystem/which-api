import { Model, model } from "mongoose"
import { UserSchema, userSchema } from './user.schema';

export default model<UserSchema, Model<UserSchema>>("User", userSchema);

