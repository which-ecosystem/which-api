import {
  AuthenticationService,
  JWTStrategy 
} from '@feathersjs/authentication';
import { LocalStrategy } from '@feathersjs/authentication-local';
import { Application } from '@feathersjs/express';

export default (app: Application): void => {
  const authentication = new AuthenticationService(app);

  authentication.register('local', new LocalStrategy());
  authentication.register('jwt', new JWTStrategy());

  app.use('/authentication', authentication);
};

