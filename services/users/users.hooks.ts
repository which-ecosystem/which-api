import { hooks } from '@feathersjs/authentication-local';

const hashPassword = hooks.hashPassword('password');
const protectPassword = hooks.protect('password');

export default {
  after: {
    all: [protectPassword]
  },
  before: {
    create: [hashPassword],
    patch: [hashPassword],
    update: [hashPassword]
  }
};

