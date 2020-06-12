import { Application } from '@feathersjs/express';
import Users from './users/users.service';
import Polls from './polls/polls.service';
import Profiles from './profiles/profiles.service';

export default (app: Application): void => {
  app.configure(Users);
  app.configure(Polls);
  app.configure(Profiles);
};

