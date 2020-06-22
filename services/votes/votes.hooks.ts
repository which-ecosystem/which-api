import { authenticate } from '@feathersjs/authentication';
import convertPoll from '../../hooks/convertPoll';

export default {
  before: {
    create: [authenticate('jwt')]
  },
  after: {
    all: [convertPoll]
  }
};

