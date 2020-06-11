import mongoose from 'mongoose';
import Promise from 'bluebird';
import _ from 'lodash';
import app from './app';
import { UserSchema } from './models/users/user.schema';

mongoose.connect('mongodb://localhost:27017/which', { useNewUrlParser: true });

const users = [
  { name: "Emma" },
  { name: "Elise" },
  { name: "Jack" },
  { name: "Oliver" },
  { name: "Jamie" },
  { name: "Aidan" },
  { name: "Jordan" },
  { name: "Erin" },
  { name: "William" },
  { name: "Ethan" },
];

const polls = [{
  contents: {
    left:{
      url: 'https://cdn.psychologytoday.com/sites/default/files/field_blog_entry_images/2019-06/pexels-photo-556667.jpeg',
      votes: 0
    },
    right:{
      url: 'https://images.pexels.com/photos/556666/pexels-photo-556666.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      votes: 0
    }
  }
},{
  contents: {
    left:{
      url: 'https://cdn.psychologytoday.com/sites/default/files/field_blog_entry_images/2019-06/pexels-photo-556667.jpeg',
      votes: 0
    },
    right:{
      url: 'https://images.pexels.com/photos/556666/pexels-photo-556666.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      votes: 0
    }
  }
}];

const populate = async () => {
  const createdUsers = await Promise.map(users, async user => {
    return await app.service('users').create(user);
  });
  console.log(createdUsers);
  await Promise.map(polls, async poll => {
    const user = _.sample(createdUsers);
    return await app.service('polls').create({...poll, authorId: user._id});
  });
  mongoose.disconnect();
};

populate();