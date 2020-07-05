import { populate, discard } from 'feathers-hooks-common';
import requireAuth from '../../hooks/requireAuth';
import signAuthority from '../../hooks/signAuthority';
import sortByDate from '../../hooks/sortByDate';


const populateAuthor = populate({
  schema: {
    include: {
      service: 'users',
      nameAs: 'author',
      parentField: 'authorId',
      childField: '_id'
    }
  }
});

export default {
  before: {
    create: [requireAuth, signAuthority],
    find: sortByDate
  },
  after: {
    all: [populateAuthor, discard('authorId')]
  }
};

