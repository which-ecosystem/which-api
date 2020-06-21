import {
  convertPollHook
} from '../../hooks/convertPoll';

import { authenticate } from '@feathersjs/authentication';

export default {
  before: {
    create: [authenticate('jwt')]
  },
  after: {
    all: [convertPollHook]
  }
};

