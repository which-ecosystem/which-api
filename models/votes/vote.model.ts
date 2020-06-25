import { Model, model } from 'mongoose';
import { VoteSchema, voteSchema } from './vote.schema';

export default model<VoteSchema, Model<VoteSchema>>('Vote', voteSchema);

