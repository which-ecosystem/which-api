import { disallow } from 'feathers-hooks-common';
import requireAuth from '../../hooks/requireAuth';
import signAuthority from '../../hooks/signAuthority';

export default {
  before: {
    create: [requireAuth, signAuthority],
    remove: disallow('external'),
    update: disallow('external'),
    patch: disallow('external')
  }
};

