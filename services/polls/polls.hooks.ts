import {
  expandAuthorHook,
  expandAuthorManyHook
} from '../../hooks/expandAuthor';

export default {
  after: {
    get: [expandAuthorHook],
    find: [expandAuthorManyHook]
  }
};

