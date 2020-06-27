import _ from 'lodash';
import { hooks } from '@feathersjs/authentication-local';
import { discard } from 'feathers-hooks-common';
import { HookContext } from '@feathersjs/feathers';

const hashPassword = hooks.hashPassword('password');

const ignoreCaseRegex = async (context: HookContext): Promise<HookContext> => {
  context.params.query = _.mapValues(context.params.query, data => {
    return _.set(data, '$options', 'i');
  });
  return context;
};

export default {
  after: {
    all: hooks.protect('password'),
    get: discard('password'), // Protect password from local get's
  },
  before: {
    find: ignoreCaseRegex,
    create: hashPassword,
    patch: hashPassword,
    update: hashPassword
  }
};

