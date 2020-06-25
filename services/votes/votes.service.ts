import { Application } from '@feathersjs/express';
import service from 'feathers-mongoose';
import Model from '../../models/votes/vote.model';

import hooks from './votes.hooks';

const VoteService = service({ Model });

export default (app: Application): void => {
  app.use('/votes/', VoteService);
  app.service('votes').hooks(hooks);
};

