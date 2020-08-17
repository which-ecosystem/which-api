import { HookContext } from '@feathersjs/feathers';
import { disallow } from 'feathers-hooks-common';
import { NotAuthenticated } from '@feathersjs/errors';
import { Types } from 'mongoose';
import bluebird from 'bluebird'; import _ from 'lodash';
import { Poll } from 'which-types';

import { PollSchema } from '../../models/polls/poll.schema';
import VoteModel from '../../models/votes/vote.model';
import sortByDate from '../../hooks/sortByDate';
import signAuthority from '../../hooks/signAuthority';
import fetchImages from '../../hooks/fetchImages';
import deleteImages from '../../hooks/deleteImages';


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

const onDelete = async (context: HookContext): Promise<HookContext> => {
  const { params: { user }, service, id } = context;
  if (id) {
    const { author } = await service.get(id);
    if (author._id.toString() !== user._id.toString()) {
      throw new NotAuthenticated('You can only DELETE your own posts!');
    }
    VoteModel.deleteMany({ pollId: id.toString() });
  }
  return context;
};


export default {
  before: {
    find: sortByDate,
    create: signAuthority,
    remove: [onDelete, deleteImages(['contents.left.url', 'contents.right.url'])],
    update: disallow('external'),
    patch: disallow('external')
  },
  after: {
    all: convertPoll,
    create: fetchImages(['contents.left.url', 'contents.right.url']),
    patch: fetchImages(['contents.left.url', 'contents.right.url'])
  }
};

