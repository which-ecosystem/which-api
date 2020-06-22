import { hooks } from '@feathersjs/authentication-local';
import { HookContext } from '@feathersjs/feathers';

const hashPassword = hooks.hashPassword('password');

const protectPassword = async (context: HookContext): Promise<HookContext> => {
  const { dispatch } = hooks.protect('password')(context);
  context.result = dispatch;
  context.dispatch = dispatch;
  return context;
}

export default {
  after: {
    all: [protectPassword]
  },
  before: {
    create: [hashPassword],
    patch: [hashPassword],
    update: [hashPassword]
  }
};

