import { populate, discard, disallow } from 'feathers-hooks-common';
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
    find: sortByDate,
    remove: disallow('external'),
    patch: disallow('external'),
    update: disallow('external')
  },
  after: {
    all: [populateAuthor, discard('authorId')]
  }
};

