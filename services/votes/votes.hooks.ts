import { HookContext } from '@feathersjs/feathers';
import requireAuth from '../../hooks/requireAuth';

const addUserId = async (context: HookContext): Promise<HookContext> => {
  const { params: { user } } = context;
  context.data.userId = user._id;
  return context;
};

export default {
  before: {
    create: [requireAuth, addUserId]
  }
};

