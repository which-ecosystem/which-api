import { HookContext } from '@feathersjs/feathers';

export default async (context: HookContext): Promise<boolean> => {
  console.log(context.params.authenticated);
  return context.params.authenticated || false;
};

