import _ from 'lodash';
import { HookContext } from '@feathersjs/feathers';


const raiseNewVerifedPolls = async (context: HookContext): Promise<HookContext> => {
  // Raise unseen verified polls to the very top
  context.result = _.sortBy(
    context.result,
    poll => !(poll.author.verified && !poll.userChoice)
  );
  return context;
};

const lowerOldPolls = async (context: HookContext): Promise<HookContext> => {
  // Move all seen polls down
  context.result = _.sortBy(
    context.result,
    poll => !!poll.userChoice
  );
  return context;
};

export default {
  after: {
    find: [raiseNewVerifedPolls, lowerOldPolls]
  }
};

