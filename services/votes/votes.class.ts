import PollModel from '../../models/polls/poll.model';
import { PollSchema } from '../../models/polls/poll.schema';

export default class Votes {
  async create(data: any, params: any): Promise<PollSchema | null> {
    const poll = await PollModel.findById(params.route.id);
    if (poll) {
      const updatedPoll = await poll.vote(params.user._id, data.which);
      return updatedPoll.toObject();
    }
    return null;
  }
}

