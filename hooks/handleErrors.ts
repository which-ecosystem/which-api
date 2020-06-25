import { HookContext } from '@feathersjs/feathers';
import logger from '../logger';


export default async (context: HookContext): Promise<HookContext> => {
  context.result = context.error.message;
  context.statusCode = context.error.code;
  logger.error(context.error);
  return context;
};

