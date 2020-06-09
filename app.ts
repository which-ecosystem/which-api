import feathers from '@feathersjs/feathers';
import express from '@feathersjs/express';
import socketio from '@feathersjs/socketio';
import '@feathersjs/transport-commons';

import services from './services';


const app = express(feathers());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.configure(express.rest());
app.configure(socketio());
app.use(express.errorHandler());
app.configure(services);


// Mock data
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

app.service('users').create({
    name: 'John Doe',
    age: 20,
    avatarUrl: 'https://github.com/ilyayudovin.png'
});

export default app;

