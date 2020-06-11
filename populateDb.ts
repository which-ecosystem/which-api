import mongoose from 'mongoose';
import app from './app';

mongoose.connect('mongodb://localhost:27017/which', { useNewUrlParser: true });

import UserModel from './models/users/user.model';
(async () => {
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
  try {
    for (const user of users) {
      await UserModel.create(user);
    }
  } catch (e) {
    console.error(e);
  }
  mongoose.disconnect();
})();