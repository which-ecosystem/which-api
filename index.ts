import app from './app';

// Add any new real-time connection to the `everybody` channel
app.on('connection', connection =>
  app.channel('everybody').join(connection)
);
// Publish all events to the `everybody` channel
app.publish(data => app.channel('everybody'));


app.listen(3030).on('listening', () =>
  console.log('Feathers server listening on localhost:3030')
);

