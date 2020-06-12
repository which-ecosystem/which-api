import { Application } from "@feathersjs/express";
import Profiles from './profile.class';

export default (app: Application): void => {
  app.use('/profile', new Profiles());
};

