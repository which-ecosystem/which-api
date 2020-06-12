import {User} from '../../models/users/user.schema';
import {Poll} from "../../models/polls/poll.schema";
import {Application} from "@feathersjs/express";

export class ProfileService {
  user: User = Object;
  saved_polls: Poll[] = [];

  async find () {
    return [this.user, this.saved_polls];
  }
}

export default (app: Application): void => {
  app.use('/profile', new ProfileService());
};