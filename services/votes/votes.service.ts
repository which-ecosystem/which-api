import { Application } from '@feathersjs/express';
import Votes from './votes.class';

import hooks from './votes.hooks';

export default (app: Application): void => {
  app.use('/polls/:id/votes/', new Votes());
  app.service('/polls/:id/votes/').hooks(hooks);
};

