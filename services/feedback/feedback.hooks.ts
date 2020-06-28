import { HookContext } from '@feathersjs/feathers';
import requireAuth from '../../hooks/requireAuth';
import signAuthority from '../../hooks/signAuthority';

export default {
  before: {
    create: [requireAuth, signAuthority]
  }
};

