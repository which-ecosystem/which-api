import { Application } from '@feathersjs/express';
import Profiles from './profiles.class';

import hooks from './profiles.hooks';

export default (app: Application): void => {
  app.use('/profiles', new Profiles());
  app.service('profiles').hooks(hooks);
};

