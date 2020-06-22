import PollModel from '../../models/polls/poll.model';
import { PollSchema } from '../../models/polls/poll.schema';

export default class Votes {
  async create(data: any, params: any): Promise<PollSchema | null> {
    const poll = await PollModel.findById(params.route.id);
    if (poll) {
      const which: 'left' | 'right' = data.which;
      const { user } = params;
      poll.contents[which].votes.push(user._id);
      return poll.save();
    }
    return null;
  }
}

