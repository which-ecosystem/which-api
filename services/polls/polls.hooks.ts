import convertPoll from '../../hooks/convertPoll';

export default {
  after: {
    all: [convertPoll],
  }
};

