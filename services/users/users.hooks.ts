import { hooks } from '@feathersjs/authentication-local';

const hashPassword = hooks.hashPassword('password');

export default {
  before: {
    create: [hashPassword],
    patch: [hashPassword],
    update: [hashPassword]
  }
};

