import { HookContext } from '@feathersjs/feathers';
import bluebird from 'bluebird';
import _ from 'lodash';

import { Poll, PollSchema } from '../models/polls/poll.schema';
import { User } from '../models/users/user.schema';
import UserModel from '../models/users/user.model';

const expandAuthor = async (poll: PollSchema): Promise<Poll | null> => {
  return UserModel.findById(poll.authorId)
    .lean<User>()
    .exec()
    .then((author: User | null): Poll | null => {
      return author && _.merge(_.omit(poll, 'authorId'), { author });
    })
    .catch(err => {
      console.error(err);
      return err;
    });
};

export const expandAuthorHook = async (context: HookContext): Promise<HookContext> => {
  context.result = await expandAuthor(context.result);
  return context;
};

export const expandAuthorManyHook = async (context: HookContext): Promise<HookContext> => {
  const polls = await bluebird.map(context.result, (poll: PollSchema) => expandAuthor(poll));
  context.result = _.compact(polls);
  return context;
};

