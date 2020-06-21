import { Application } from '@feathersjs/express';
import Users from './users/users.service';
import Polls from './polls/polls.service';
import Profiles from './profiles/profiles.service';
import Votes from './votes/votes.service';
import Auth from './auth/auth.service';

export default (app: Application): void => {
  app.configure(Auth);
  app.configure(Users);
  app.configure(Polls);
  app.configure(Profiles);
  app.configure(Votes);
};

