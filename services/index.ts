import { Application } from '@feathersjs/express';
import Users from './users/users.service';
import Polls from './polls/polls.service';
import Profiles from './profiles/profiles.service';
import Votes from './votes/votes.service';
import Auth from './auth/auth.service';
import Feed from './feed/feed.service';
import Feedback from './feedback/feedback.service';
import Files from './files/files.service';

import tryAuthenticate from '../hooks/tryAuthenticate';
import logging from '../hooks/logging';
import handleErrors from '../hooks/handleErrors';

export default (app: Application): void => {
  app.configure(Auth);
  app.configure(Users);
  app.configure(Polls);
  app.configure(Profiles);
  app.configure(Votes);
  app.configure(Feed);
  app.configure(Feedback);
  app.configure(Files);

  app.get('/ping', (req, res) => res.send('pong'));

  app.hooks({
    before: {
      all: [tryAuthenticate, logging]
    },
    error: {
      all: handleErrors
    }
  });
};

