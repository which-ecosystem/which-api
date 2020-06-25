import { HookContext } from '@feathersjs/feathers';

export default async (context: HookContext): Promise<HookContext> => {
  if (context.params.provider) {
    const { method, path, id } = context;
    const timestamp = new Date().toLocaleString('default', { timeStyle: 'medium', dateStyle: 'short' });
    const message = `${method.toUpperCase()}: /${path}/${id || ''}`;
    const username = context.params.user?.username || 'anonymous';

    console.log(`[${timestamp}]  ${message} ${username}`);
  }
  return context;
};

