import _ from 'lodash';
import { hooks } from '@feathersjs/authentication-local';
import { discard, disallow } from 'feathers-hooks-common';
import { HookContext } from '@feathersjs/feathers';
import { NotAuthenticated } from '@feathersjs/errors';
import requireAuth from '../../hooks/requireAuth';

const hashPassword = hooks.hashPassword('password');

const ignoreCaseRegex = async (context: HookContext): Promise<HookContext> => {
  context.params.query = _.mapValues(context.params.query, data => {
    return _.set(data, '$options', 'i');
  });
  return context;
};

const compareUser = async (context: HookContext): Promise<HookContext> => {
  if (context.arguments[0] !== context.params.user._id) {
    throw new NotAuthenticated('You can only PATCH/UPDATE your own user!');
  }
  return context;
};

export default {
  after: {
    all: hooks.protect('password'),
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

