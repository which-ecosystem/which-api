import { PollSchema } from '../../models/polls/poll.schema';
import PollModel from '../../models/polls/poll.model';

export default class Profiles {
  async get(id: string): Promise<PollSchema[]> {
    return PollModel.find({ authorId: id }).lean();
  }
}

