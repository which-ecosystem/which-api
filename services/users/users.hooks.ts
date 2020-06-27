import _ from 'lodash';
import { hooks } from '@feathersjs/authentication-local';
import { HookContext } from '@feathersjs/feathers';

const hashPassword = hooks.hashPassword('password');

const localDispatch = async (context: HookContext): Promise<HookContext> => {
  context.result = context.dispatch;
  return context;
};

const ignoreCaseRegex = async (context: HookContext): Promise<HookContext> => {
  context.params.query = _.mapValues(context.params.query, data => {
    return _.set(data, '$options', 'i');
  });
  return context;
};

export default {
  after: {
    all: hooks.protect('password'),
    get: localDispatch, // Protect password from local get's
  },
  before: {
    find: ignoreCaseRegex,
    create: hashPassword,
    patch: hashPassword,
    update: hashPassword
  }
};

