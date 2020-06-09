import { Application } from '@feathersjs/express';
import Users from './users.class';

export default (app: Application): void => {
  app.use('/users', new Users());
};

