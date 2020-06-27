import { iff, isNot } from 'feathers-hooks-common';
import { NotAuthenticated } from '@feathersjs/errors';
import isAuthenticated from './isAuthenticated';

export default iff(
  isNot(isAuthenticated),
  () => {
    throw new NotAuthenticated('This endpoint requires auth!');
  }
);

