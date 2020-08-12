import { HookContext } from '@feathersjs/feathers';
import { disallow } from 'feathers-hooks-common';
import { Types } from 'mongoose';
import bluebird from 'bluebird'; import _ from 'lodash';
import { Poll } from 'which-types';

import { PollSchema } from '../../models/polls/poll.schema';
import VoteModel from '../../models/votes/vote.model';
import sortByDate from '../../hooks/sortByDate';
import signAuthority from '../../hooks/signAuthority';
import fetchImages from '../../hooks/fetchImages';


const convertPoll = async (context: HookContext): Promise<HookContext> => {
  const { app, result, params: { user } } = context;

  const convert = async (poll: PollSchema): Promise<Poll | null> => {
    const author = await app.service('users').get(poll.authorId);

    const contents = await VoteModel.aggregate([
      { $match: { pollId: Types.ObjectId(poll._id) } },
      { $group: { _id: '$which', total: { $sum: 1 } } }
    ]).then(groups => groups.reduce(
      (acc, group) => _.set(acc, `${group._id}.votes`, group.total),
      { left: { votes: 0 }, right: { votes: 0 } }
    ));

    const vote = await VoteModel.findOne(
      { pollId: poll._id, authorId: user?._id }
    );

    return _.merge(
      _.omit(poll, ['authorId']),
      { author, contents, vote }
    );
  };

  if (Array.isArray(result)) {
    const polls = await bluebird.map(result, (poll: PollSchema) => convert(poll));
    context.result = _.compact(polls);
  } else {
    context.result = await convert(result);
  }
  return context;
};


export default {
  before: {
    find: sortByDate,
    create: signAuthority,
    remove: disallow('external'),
    update: disallow('external'),
    patch: disallow('external')
  },
  after: {
    all: convertPoll,
    create: fetchImages(['contents.left.url', 'contents.right.url']),
    patch: fetchImages(['contents.left.url', 'contents.right.url'])
  }
};

