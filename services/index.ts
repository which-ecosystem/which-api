import Users from './users/users.service';
import Polls from './polls/polls.service';

export default (app: Application): void => {
  app.configure(Users);
  app.configure(Polls);
};

