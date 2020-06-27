import { Application } from '@feathersjs/express';
import Profiles from './profiles.class';

export default (app: Application): void => {
  app.use('/profiles', new Profiles());
};

