import { Application } from '@feathersjs/express';
import Model from '../../models/polls/poll.model';
import service from 'feathers-mongoose';
import hooks from './polls.hooks'

const PollService = service({ Model });

export default (app: Application): void => {
  app.use('/polls', PollService);
  app.service('polls').hooks(hooks);
};

