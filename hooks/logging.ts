import { HookContext } from '@feathersjs/feathers';
import logger from '../logger';

export default async (context: HookContext): Promise<HookContext> => {
  if (context.params.provider) {
    const { method, path, id } = context;
    const message = `${method.toUpperCase()}: /${path}/${id || ''}`;
    const username = context.params.user?.username || 'anonymous';

    logger.log(`${message} ${username}`);
  }
  return context;
};

