import {
  expandAuthorManyHook,
} from '../../hooks/expandAuthor';

export default {
  after: {
    get: [expandAuthorManyHook],
  }
};

