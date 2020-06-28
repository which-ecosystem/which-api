import { Application } from '@feathersjs/express';
import service from 'feathers-mongoose';
import Model from '../../models/feedback/feedback.model';

import hooks from './feedback.hooks';

const FeebackService = service({ Model });

export default (app: Application): void => {
  app.use('/feedback', FeebackService);
  app.service('feedback').hooks(hooks);
};

