import { HookContext } from '@feathersjs/feathers';
import { authenticate } from '@feathersjs/authentication';


export default async (context: HookContext): Promise<boolean> => {
  console.log(context.params.authenticated);
  return context.params.authenticated || false;
};

