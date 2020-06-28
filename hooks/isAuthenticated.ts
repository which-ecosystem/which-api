import { HookContext } from '@feathersjs/feathers';

export default async (context: HookContext): Promise<boolean> => {
  return context.params.authenticated || false;
};

