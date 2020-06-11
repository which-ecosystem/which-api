import mongoose from 'mongoose';
import Promise from 'bluebird';
import app from './app';

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

Promise.map(users, async user => {
  return await app.service('users').create(user);
}).catch(e => console.error(e))
  .finally(() => mongoose.disconnect());

