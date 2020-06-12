import { Application } from '@feathersjs/express';
import service from 'feathers-mongoose';
import Model from '../../models/users/user.model';

const UserService = service({ Model });

export default (app: Application): void => {
  app.use('/users', UserService);
};

