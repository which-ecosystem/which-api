import { Application } from '@feathersjs/express';
import Feed from './feed.class';

export default (app: Application): void => {
  app.use('/feed', new Feed());
};

