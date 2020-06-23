import { Model, model } from 'mongoose';
import { PollSchema, pollSchema } from './poll.schema';

pollSchema.methods.vote = function(userId: string, which: 'left' | 'right'): PollSchema {
  const participants = ['left', 'right'].reduce((acc, option) => {
    const { votes } = this.contents[option];
    return acc.concat(votes);
  }, []);

  if (!participants.indexOf(userId) === -1) {
    this.contents[which].votes.push(userId);
  }

  return this.save();
}

export default model<PollSchema, Model<PollSchema>>('Poll', pollSchema);

