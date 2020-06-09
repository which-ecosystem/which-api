import { Model, model } from "mongoose"
import { User, UserSchema } from './user.schema';

export default model<User, Model<User>>("User", UserSchema);

