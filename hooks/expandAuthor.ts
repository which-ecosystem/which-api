import { HookContext } from '@feathersjs/feathers';
import bluebird from 'bluebird';
import _ from 'lodash';

import { Poll, PollSchema } from '../models/polls/poll.schema';
import { User } from '../models/users/user.schema';
import UserModel from '../models/users/user.model';

const convertPoll = async (poll: PollSchema): Promise<Poll | null> => {
  return UserModel.findById(poll.authorId)
    .lean<User>()
    .exec()
    .then((author: User | null): Poll | null => {
      return author && {
        _id: poll._id,
        author,
        contents: {
          left: {
            url: poll.contents.left.url,
            votes: poll.contents.left.votes.length
          },
          right: {
            url: poll.contents.right.url,
            votes: poll.contents.right.votes.length
          }
        }
      };
    })
    .catch(err => {
      console.error(err);
      return err;
    });
};

export const expandAuthorHook = async (context: HookContext): Promise<HookContext> => {
  context.result = await convertPoll(context.result);
  return context;
};

export const expandAuthorManyHook = async (context: HookContext): Promise<HookContext> => {
  const polls = await bluebird.map(context.result, (poll: PollSchema) => convertPoll(poll));
  context.result = _.compact(polls);
  return context;
};

