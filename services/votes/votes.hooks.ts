import { HookContext } from '@feathersjs/feathers';
import { authenticate } from '@feathersjs/authentication';

const addUserId = async (context: HookContext): Promise<HookContext> => {
  const { params: { user} } = context;
  context.data.userId = user._id;
  return context;
};

export default {
  before: {
    create: [authenticate('jwt'), addUserId]
  }
};

