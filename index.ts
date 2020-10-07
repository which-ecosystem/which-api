import mongoose from 'mongoose';
import Promise from 'bluebird';
import './env';
import app from './app';

mongoose.Promise = Promise;


const MONGODB_URL = process.env.MONGODB_URI || 'mongodb://localhost:27017/which';
const PORT = process.env.PORT || 3030;

mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  family: 4 // Use IPv4, skip trying IPv6
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connection to MongoDB successful');
});

// Add any new real-time connection to the `everybody` channel
app.on('connection', connection => app.channel('everybody').join(connection));
// Publish all events to the `everybody` channel
app.publish(() => app.channel('everybody'));


app.listen(PORT).on('listening', () => console.log(`Feathers server listening on localhost:${PORT}`));

