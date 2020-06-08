import feathers from '@feathersjs/feathers';
import '@feathersjs/transport-commons';
import express from '@feathersjs/express';
import socketio from '@feathersjs/socketio';

import { PollService } from './PollService';

const app = express(feathers());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.configure(express.rest());
app.configure(socketio());
app.use(express.errorHandler());

app.use('/polls', new PollService());


// Add any new real-time connection to the `everybody` channel
app.on('connection', connection =>
  app.channel('everybody').join(connection)
);
// Publish all events to the `everybody` channel
app.publish(data => app.channel('everybody'));


app.listen(3030).on('listening', () =>
  console.log('Feathers server listening on localhost:3030')
);

// For good measure let's create a message
// So our API doesn't look so empty
app.service('polls').create({
  contents: {
    left: {
      url: 'https://github.com/eug-vs.png',
      votes: 10
    },
    right: {
      url: 'https://github.com/ilyayudovin.png',
      votes: 15
    }
  }
});
