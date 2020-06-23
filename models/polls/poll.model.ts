import { Model, model } from 'mongoose';
import { PollSchema, pollSchema } from './poll.schema';
import { Types } from 'mongoose';

pollSchema.methods.vote = function(userId: string, which: 'left' | 'right'): PollSchema {
  const participants: Types.ObjectId[] = ['left', 'right'].reduce((acc, option) => {
    const { votes } = this.contents[option];
    return acc.concat(votes);
  }, []);

  if (!participants.some(user => user.equals(userId))) {
    this.contents[which].votes.push(userId);
  }

  return this.save();
}

export default model<PollSchema, Model<PollSchema>>('Poll', pollSchema);

