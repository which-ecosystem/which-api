import _ from 'lodash';
import { HookContext } from '@feathersjs/feathers';
import { iff } from 'feathers-hooks-common';
import isAuthenticated from '../../hooks/isAuthenticated';

const raiseNewVerifedPolls = async (context: HookContext): Promise<HookContext> => {
  // Raise unseen verified polls to the very top
  context.result = _.sortBy(
    context.result,
    poll => !(poll.author.verified && !poll.vote)
  );
  return context;
};

const lowerOldPolls = async (context: HookContext): Promise<HookContext> => {
  // Move all seen polls down
  context.result = _.sortBy(
    context.result,
    poll => !!poll.vote
  );
  return context;
};

export default {
  after: {
    find: [
      iff(isAuthenticated, raiseNewVerifedPolls),
      iff(isAuthenticated, lowerOldPolls)
    ]
  }
};

