import _ from 'lodash';
import { hooks } from '@feathersjs/authentication-local';
import { discard, disallow } from 'feathers-hooks-common';
import { HookContext } from '@feathersjs/feathers';
import { NotAuthenticated } from '@feathersjs/errors';
import requireAuth from '../../hooks/requireAuth';
import fetchImages from '../../hooks/fetchImages';

const hashPassword = hooks.hashPassword('password');

const ignoreCaseRegex = async (context: HookContext): Promise<HookContext> => {
  context.params.query = _.mapValues(context.params.query, data => {
    return _.set(data, '$options', 'i');
  });
  return context;
};

const compareUser = async (context: HookContext): Promise<HookContext> => {
  if (context.id !== context.params.user._id.toString()) {
    throw new NotAuthenticated('You can only PATCH/UPDATE your own user!');
  }
  return context;
};

export default {
  after: {
    all: hooks.protect('password'),
    create: fetchImages(['avatarUrl']),
    patch: fetchImages(['avatarUrl']),
    get: discard('password') // Protect password from local get's
  },
  before: {
    find: ignoreCaseRegex,
    create: hashPassword,
    patch: [hashPassword, requireAuth, compareUser],
    update: [hashPassword, requireAuth, compareUser],
    remove: disallow('external')
  }
};

