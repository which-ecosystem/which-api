import { Application } from '@feathersjs/express';
import Polls from './polls.class';

export default (app: Application): void => {
  app.use('/polls', new Polls());
};

