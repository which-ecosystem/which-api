import { Application } from '@feathersjs/express';
import Model from '../../models/polls/poll.model';
import service from 'feathers-mongoose';

const PollService = service({ Model });

export default (app: Application): void => {
  app.use('/polls', PollService);
};

