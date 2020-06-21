import PollModel from '../../models/polls/poll.model';
import { PollSchema } from '../../models/polls/poll.schema';

export default class Votes {
  async create(data: any, params: any): Promise<PollSchema | null> {
    return PollModel.findById(params.route.id)
      .then(poll => poll?.vote(params.user._id, data.which))
      .catch(e => {
        console.error(e);
        return null;
      });
  }
}

