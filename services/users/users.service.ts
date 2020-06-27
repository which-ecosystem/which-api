import { Application } from '@feathersjs/express';
import service from 'feathers-mongoose';
import Model from '../../models/users/user.model';
import hooks from './users.hooks';

const UserService = service({ Model, whitelist: ['$options', '$regex'] });

export default (app: Application): void => {
  app.use('/users', UserService);
  app.service('users').hooks(hooks);
};

