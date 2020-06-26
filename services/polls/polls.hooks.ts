import convertPoll from '../../hooks/convertPoll';
import sortByDate from '../../hooks/sortByDate';

export default {
  before: {
    find: sortByDate
  },
  after: {
    all: convertPoll
  }
};

