import { Model, model } from "mongoose"
import { Poll, PollSchema } from './poll.schema';

export default model<Poll, Model<Poll>>("Poll", PollSchema);

