import { Application } from '@feathersjs/express';
import { Params } from '@feathersjs/feathers';
import { Poll } from 'which-types';


export default class Profiles {
  app!: Application;

  async get(id: string, params: Params ): Promise<Poll[]> {
    return this.app.service('polls').find({
      ...params,
      query: {
        authorId: id
      }
    });
  }

  setup(app: Application): void {
    this.app = app;
  }
}

