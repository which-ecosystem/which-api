import { NotAuthenticated } from '@feathersjs/errors';
import { HookContext } from '@feathersjs/feathers';

export default async (context: HookContext): Promise<HookContext> => {
  if (!context.params.authenticated) {
    throw new NotAuthenticated('This endpoint requires auth!');
  }
  return context;
};

