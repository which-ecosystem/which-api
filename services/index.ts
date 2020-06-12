import { Application } from '@feathersjs/express';
import Users from './users/users.service';
import Polls from './polls/polls.service';
import Profile from './profile/profile.service';

export default (app: Application): void => {
  app.configure(Users);
  app.configure(Polls);
  app.configure(Profile);
};

