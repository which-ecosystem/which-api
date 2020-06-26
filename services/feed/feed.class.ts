import { Application } from '@feathersjs/express';
import { Params } from '@feathersjs/feathers';
import { Poll } from 'which-types';


export default class Feed {
  app!: Application;

  async find(params: Params): Promise<Poll[]> {
    return this.app.service('polls').find(params);
  }

  setup (app: Application) {
    this.app = app;
  }
}

