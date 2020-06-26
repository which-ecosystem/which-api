import _ from 'lodash';
import { HookContext } from '@feathersjs/feathers';

export default async (context: HookContext): Promise<HookContext> => {
  _.set(context, 'params.query.$sort', { createdAt: -1 });
  return context;
};

