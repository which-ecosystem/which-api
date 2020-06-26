import { Application } from '@feathersjs/express';
import { Poll } from 'which-types';


export default class Profiles {
  app!: Application;

  async get(id: string): Promise<Poll[]> {
    return this.app.service('polls').find({
      query: {
        authorId: id
      }
    });
  }

  setup (app: Application) {
    this.app = app;
  }
}

