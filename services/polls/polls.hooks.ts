import _ from 'lodash';
import { HookContext } from '@feathersjs/feathers';
import convertPoll from '../../hooks/convertPoll';

const sort = async (context: HookContext): Promise<HookContext> => {
  _.set(context, 'params.query.$sort', { createdAt: - 1});
  return context;
}

export default {
  before: {
    find: sort
  },
  after: {
    all: [convertPoll]
  }
};

