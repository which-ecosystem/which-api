import { HookContext } from '@feathersjs/feathers';
import bluebird from 'bluebird';
import _ from 'lodash';

import { PollSchema } from '../../models/polls/poll.schema';
import { UserSchema } from '../../models/users/user.schema';
import UserModel from '../../models/users/user.model';


interface Poll extends Omit<PollSchema, 'authorId'> {
  author: UserSchema;
}

const expandAuthor = async (poll: PollSchema): Promise<Poll | null> => {
  return UserModel.findById(poll.authorId).then((author: UserSchema | null): Poll | null => {
    if (author) return _.merge(_.omit(poll, 'authorId'), { author });
    return null;
  });
};

const expandAuthorHook = async (context: HookContext): Promise<HookContext> => {
  context.result = await expandAuthor(context.result);
  return context;
};

const expandAuthorManyHook = async (context: HookContext): Promise<HookContext> => {
  context.result = await bluebird.map(context.result, (poll: any) => expandAuthor(poll));
  console.log(context.result);
  return context;
};


export default {
  after: {
    get: [expandAuthorHook],
    find: [expandAuthorManyHook]
  }
}
