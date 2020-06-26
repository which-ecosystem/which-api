import _ from 'lodash';
import { Application } from '@feathersjs/express';
import { Params } from '@feathersjs/feathers';
import { Poll } from 'which-types';

import { PollSchema } from '../../models/polls/poll.schema';
import PollModel from '../../models/polls/poll.model';


export default class Feed {
  app!: Application;

  async find(params: Params): Promise<Poll[]> {
    return this.app.service('polls')
      .find(params)
      .then( // Move new verified polls on top
        (polls: Poll[]) => _.sortBy(polls, poll => poll.author.verified && !poll.userChoice)
      ).then( // But all seen posts go down
        (polls: Poll[]) => _.sortBy(polls, poll => !!poll.userChoice)
      );
  }

  setup (app: Application) {
    this.app = app;
  }
}

