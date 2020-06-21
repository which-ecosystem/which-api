import { Model, model } from 'mongoose';
import { PollSchema, pollSchema } from './poll.schema';

pollSchema.methods.vote = function(userId: string, which: 'left' | 'right'): PollSchema {
  this.contents[which].votes.push(userId);
  return this.save();
}

export default model<PollSchema, Model<PollSchema>>('Poll', pollSchema);

