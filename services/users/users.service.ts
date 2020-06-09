import { Application } from '@feathersjs/express';
import Model from '../../models/users/user.model';
import service from 'feathers-mongoose';

const UserService = service({ Model });

export default (app: Application): void => {
  app.use('/users', UserService);
};

