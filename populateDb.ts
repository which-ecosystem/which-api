import mongoose from 'mongoose';
import bluebird from 'bluebird';
import _ from 'lodash';
import {
  User,
  Poll,
  Vote,
  Feedback
} from 'which-types';

import app from './app';

const MONGODB_URL = process.env.MONGODB_URI || 'mongodb://localhost:27017/which';

mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  family: 4 // Use IPv4, skip trying IPv6
});

const POLLS_AMOUNT = 20;

const imageUrls: string[] = [
  // eslint-disable max-len
  'https://cdn.psychologytoday.com/sites/default/files/field_blog_entry_images/2019-06/pexels-photo-556667.jpeg',
  'https://images.pexels.com/photos/556666/pexels-photo-556666.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://i.pinimg.com/originals/50/91/3e/50913eeb04768a5b1fa9985c16704d96.jpg',
  'https://grazia.wwmindia.com/photogallery/2017/apr/1_1491461089.jpg'
];

const names: string[] = [
  'Emma',
  'Elise',
  'Jack',
  'Oliver',
  'Jamie',
  'Adam',
  'Jordan',
  'William'
];

const choices = [
  'left',
  'right'
];


const createPoll = (authorId: string): Promise<Poll> => {
  const generateImageData = () => ({
    url: _.sample(imageUrls) || ''
  });

  return app.service('polls').create({
    contents: {
      left: generateImageData(),
      right: generateImageData()
    },
  }, { user: { _id: authorId }, authenticated: true });
};

const createUser = (username: string): Promise<User> => {
  return app.service('users').create({
    avatarUrl: _.sample(imageUrls) || '',
    password: 'supersecret',
    username
  });
};

const createVote = (authorId: string, pollId: string): Promise<Vote> => {
  return app.service('votes').create({
    pollId,
    which: _.sample(choices)
  }, { user: { _id: authorId }, authenticated: true });
};

const createFeedback = (userId: string): Promise<Feedback> => {
  return app.service('feedback').create({
    version: 'v1.0.0',
    score: _.sample([1, 2, 3, 4, 5]),
    contents: 'Absolutely amazing!'
  }, { user: { _id: userId }, authenticated: true });
};

const populate = async () => {
  const users = await bluebird.map(names, name => createUser(name));

  const polls = await bluebird.mapSeries(new Array(POLLS_AMOUNT), async () => {
    const user = _.sample(users);
    return createPoll(user?._id || '');
  });

  await bluebird.map(users, user => {
    return createFeedback(user?._id || '');
  });

  await bluebird.map(users, user => {
    const pollsToVote = _.sampleSize(polls, _.random(0, POLLS_AMOUNT));
    return bluebird.map(pollsToVote, poll => createVote(user?._id || '', poll?._id || ''));
  });
};

populate().finally(mongoose.disconnect);

