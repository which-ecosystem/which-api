import { HookContext } from '@feathersjs/feathers';
import bluebird from 'bluebird';
import _ from 'lodash';
import { Poll, User } from 'which-types';

import { PollSchema } from '../models/polls/poll.schema';


export default async (context: HookContext): Promise<HookContext> => {
  const { app, result } = context;

  const convert = async (poll: PollSchema): Promise<Poll | null> => {
    return app.service('users').get(poll.authorId)
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
      });
  };

  if (Array.isArray(result)) {
    const polls = await bluebird.map(result, (poll: PollSchema) => convert(poll));
    context.result = _.compact(polls);
  } else {
    context.result = await convert(result);
  }
  return context;
};

