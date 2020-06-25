import { HookContext } from '@feathersjs/feathers';

export default async (context: HookContext): Promise<HookContext> => {
  if (!context.params.user) throw new Error('This endpoint requires auth!');
  return context;
};

