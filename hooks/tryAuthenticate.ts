import { HookContext } from '@feathersjs/feathers';
import { authenticate } from '@feathersjs/authentication';


export default async (context: HookContext): Promise<HookContext> => {
  return authenticate('jwt')(context).catch(() => context);
};

