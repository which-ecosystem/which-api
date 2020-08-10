import { Application } from '@feathersjs/express';
import Files from './files.class';

export default (app: Application): void => {
  app.use('/files', new Files());
};

