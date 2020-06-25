import { Model, model } from 'mongoose';
import { VoteSchema, voteSchema } from './vote.schema';

voteSchema.index({ pollId: 1, userId: 1 }, { unique: true }); // Unique together

export default model<VoteSchema, Model<VoteSchema>>('Vote', voteSchema);

