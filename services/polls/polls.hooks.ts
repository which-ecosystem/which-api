import {
  convertPollHook,
  convertPollManyHook
} from '../../hooks/convertPoll';

export default {
  after: {
    get: [convertPollHook],
    find: [convertPollManyHook]
  }
};

