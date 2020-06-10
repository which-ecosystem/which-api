import app from './app';
import mongoose from 'mongoose';
import Promise from 'bluebird';

mongoose.Promise = Promise;

mongoose.connect('mongodb://localhost:27017/which', { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connection to MongoDB successful');
});

// Add any new real-time connection to the `everybody` channel
app.on('connection', connection =>
  app.channel('everybody').join(connection)
);
// Publish all events to the `everybody` channel
app.publish(data => app.channel('everybody'));


const port = 3030
app.listen(port).on('listening', () =>
  console.log(`Feathers server listening on localhost:${port}`)
);

