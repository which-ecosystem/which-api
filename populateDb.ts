import mongoose from 'mongoose';
import bluebird from 'bluebird';
import _ from 'lodash';
import app from './app';
import { UserSchema } from './models/users/user.schema';
import { PollSchema, ImageDataSchema } from './models/polls/poll.schema';

mongoose.connect('mongodb://localhost:27017/which', { useNewUrlParser: true });

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


const createPoll = (authorId: string, generateImageData:()=> ImageDataSchema): Promise<PollSchema> => {
  return app.service('polls').create({
    contents: {
      left: generateImageData(),
      right: generateImageData()
    },
    authorId
  });
};

const createUser = (username: string): Promise<UserSchema> => {
  return app.service('users').create({
    avatarUrl: _.sample(imageUrls) || '',
    password: 'supersecret',
    username
  });
};


const populate = async () => {
  const users = await bluebird.map(names, name => createUser(name));

  const generateImageData = (): ImageDataSchema => ({
    url: _.sample(imageUrls) || '',
    votes: _.sampleSize(users.map(user => user._id), Math.floor(Math.random() * users.length))
  });

  await bluebird.mapSeries(new Array(POLLS_AMOUNT), async () => {
    const sampleUser = _.sample(users);
    return createPoll(sampleUser?._id, generateImageData);
  });
};

populate().finally(mongoose.disconnect);

