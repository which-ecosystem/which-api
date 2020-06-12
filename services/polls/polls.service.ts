import { Application } from '@feathersjs/express';
import service from 'feathers-mongoose';
import Model from '../../models/polls/poll.model';
import hooks from './polls.hooks';

const PollService = service({ Model });

export default (app: Application): void => {
  app.use('/polls', PollService);
  app.service('polls').hooks(hooks);
};

