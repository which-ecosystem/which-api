import mongoose from 'mongoose';
import bluebird from 'bluebird';
import _ from 'lodash';
import {
  User,
  Poll,
  Vote,
  Feedback
} from 'which-types';

import app from '../app';
app.service('files').setup(app);

const MONGODB_URL = process.env.MONGODB_URI || 'mongodb://localhost:27017/which';

mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  family: 4 // Use IPv4, skip trying IPv6
});

const patchPoll = (poll: Poll): Promise<Poll> => {
  console.log(`Patching poll of user ${poll.author.username}`)
  return app.service('polls').patch(poll._id.toString(), {}, { user: poll.author, authenticated: true });
};

const patchUser = (user: User): Promise<User> => {
  console.log(`Patching user ${user.username}`)
  return app.service('users').patch(user._id.toString(), {}, { user, authenticated: true });
};

const update = async () => {
  const users = app.service('users').find();

  await bluebird.mapSeries(users, async (user: User) => {
    await patchUser(user);
    const polls = await app.service('polls').find({ query: { authorId: user._id }});
    await bluebird.mapSeries(polls, (poll: Poll) => patchPoll(poll));
    return;
  });
};

update();

