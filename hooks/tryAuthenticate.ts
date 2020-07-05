import { HookContext } from '@feathersjs/feathers';
import { authenticate } from '@feathersjs/authentication';


export default async (context: HookContext): Promise<HookContext> => {
  if (context.params?.headers?.authorization && context.path !== 'authentication') {
    return authenticate('jwt')(context);
  }
  return context;
};

