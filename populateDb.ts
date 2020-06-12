import mongoose from 'mongoose';
import bluebird from 'bluebird';
import _ from 'lodash';
import app from './app';
import { UserSchema } from './models/users/user.schema';
import { PollSchema, ImageData } from './models/polls/poll.schema';

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

const generateImageData = (): ImageData => ({
  url: _.sample(imageUrls) || '',
  votes: Math.floor(Math.random() * 101)
});

const createPoll = (authorId: string): Promise<PollSchema> => {
  return app.service('polls').create({
    contents: {
      left: generateImageData(),
      right: generateImageData()
    },
    authorId
  });
};

const createUser = (name: string): Promise<UserSchema> => {
  return app.service('users').create({
    avatarUrl: _.sample(imageUrls) || '',
    name
  });
};


const populate = async () => {
  const users = await bluebird.map(names, name => createUser(name));

  for (let i = 0; i < POLLS_AMOUNT; i++) {
    const sampleUser = _.sample(users);
    await createPoll(sampleUser?._id);
  }
};

populate().finally(mongoose.disconnect);

