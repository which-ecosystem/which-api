import {
  convertPollManyHook
} from '../../hooks/convertPoll';

export default {
  after: {
    get: [convertPollManyHook]
  }
};

