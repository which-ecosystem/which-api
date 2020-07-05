import { HookContext } from '@feathersjs/feathers';
import { authenticate } from '@feathersjs/authentication';


export default async (context: HookContext): Promise<HookContext> => {
  const authorization = context.params?.headers?.authorization;
  if (authorization && authorization !== 'null' && context.path !== 'authentication') {
    return authenticate('jwt')(context);
  }
  return context;
};

