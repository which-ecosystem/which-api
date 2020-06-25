import { Model, model, Types } from 'mongoose';
import { Which } from 'which-types';
import { PollSchema, pollSchema } from './poll.schema';


pollSchema.methods.vote = function vote(userId: string, which: Which): PollSchema {
  const participants: Types.ObjectId[] = ['left', 'right'].reduce((acc, option) => {
    const { votes } = this.contents[option];
    return acc.concat(votes);
  }, []);

  if (!participants.some(user => user.equals(userId))) {
    this.contents[which].votes.push(userId);
  }

  return this.save();
};

export default model<PollSchema, Model<PollSchema>>('Poll', pollSchema);

