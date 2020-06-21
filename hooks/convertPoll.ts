import { HookContext } from '@feathersjs/feathers';
import bluebird from 'bluebird';
import _ from 'lodash';
import { Poll, User } from 'which-types';

import { PollSchema } from '../models/polls/poll.schema';
import UserModel from '../models/users/user.model';

const convertPoll = async (poll: PollSchema): Promise<Poll | null> => {
  return UserModel.findById(poll.authorId)
    .lean<User>()
    .exec()
    .then((author: User | null): Poll | null => {
      return author && _.merge(
        _.omit(poll, ['authorId']),
        {
          author,
          contents: {
            left: {
              votes: poll.contents.left.votes.length
            },
            right: {
              votes: poll.contents.right.votes.length
            }
          }
        }
      );
    })
    .catch(err => {
      console.error(err);
      return err;
    });
};

export const convertPollHook = async (context: HookContext): Promise<HookContext> => {
  context.result = await convertPoll(context.result);
  return context;
};

export const convertPollManyHook = async (context: HookContext): Promise<HookContext> => {
  const polls = await bluebird.map(context.result, (poll: PollSchema) => convertPoll(poll));
  context.result = _.compact(polls);
  return context;
};

