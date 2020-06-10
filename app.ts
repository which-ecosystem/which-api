import feathers from '@feathersjs/feathers';
import express from '@feathersjs/express';
import socketio from '@feathersjs/socketio';
import '@feathersjs/transport-commons';
import cors from 'cors';

import services from './services';


const app = express(feathers());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.configure(express.rest());
app.configure(socketio());
app.use(express.errorHandler());
app.use(cors());
app.configure(services);


export default app;

