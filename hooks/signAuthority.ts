import { HookContext } from '@feathersjs/feathers';

export default async (context: HookContext): Promise<HookContext> => {
  const { params: { user } } = context;
  context.data.authorId = user._id;
  return context;
};

