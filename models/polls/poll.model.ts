import { Model, model } from "mongoose"
import { PollSchema, pollSchema } from './poll.schema';

export default model<PollSchema, Model<PollSchema>>("Poll", pollSchema);

