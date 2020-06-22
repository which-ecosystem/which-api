import { hooks } from '@feathersjs/authentication-local';
import { HookContext } from '@feathersjs/feathers';

const hashPassword = hooks.hashPassword('password');

const localDispatch = async (context: HookContext): Promise<HookContext> => {
  context.result = context.dispatch;
  return context;
}

export default {
  after: {
    all: [hooks.protect('password')],
    get: [localDispatch] // Protect password from local get's
  },
  before: {
    create: [hashPassword],
    patch: [hashPassword],
    update: [hashPassword]
  }
};

