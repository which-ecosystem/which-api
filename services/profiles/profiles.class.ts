import { Application } from '@feathersjs/express';
import { Params } from '@feathersjs/feathers';
import { Poll, User } from 'which-types';


export default class Profiles {
  app!: Application;

  async get(username: string, params: Params): Promise<Poll[]> {
    const profileUser = await this.app.service('users').find({
      query: { username }
    }).then((results: User[]) => results[0]);

    return this.app.service('polls').find({
      ...params,
      query: {
        authorId: profileUser._id
      }
    });
  }

  setup(app: Application): void {
    this.app = app;
  }
}

