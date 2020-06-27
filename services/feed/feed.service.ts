import { Application } from '@feathersjs/express';
import Feed from './feed.class';

import hooks from './feed.hooks';

export default (app: Application): void => {
  app.use('/feed', new Feed());
  app.service('feed').hooks(hooks);
};

