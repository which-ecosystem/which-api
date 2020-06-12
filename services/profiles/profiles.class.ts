import { Poll, PollSchema } from "../../models/polls/poll.schema";
import PollModel from '../../models/polls/poll.model';

export default class Profiles {
  async get(id: string, params: any): Promise<PollSchema[]> {
    return PollModel.find({ authorId: id }).lean<Poll>();
  }
};

