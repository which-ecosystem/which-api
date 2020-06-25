import { HookContext } from '@feathersjs/feathers';

export default async (context: HookContext): Promise<HookContext> => {
  if (context.params.provider) {
    const { method, path, id, params: { user: { username }} } = context;
    const timestamp = new Date().toLocaleString('default', { timeStyle: 'medium', dateStyle: 'short' });
    const message = `${method.toUpperCase()}: /${path}/${id || ''}`;

    console.log(`[${timestamp}]  ${message} ${username || ''}`);
  }
  return context;
};

