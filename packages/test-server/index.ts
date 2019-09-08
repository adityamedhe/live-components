import { EntityStoreWatchManagerMongo } from 'entitystore-watch-manager-mongo';
import { ClientManagerSocketIO } from 'client-manager-socketio';
import { connect } from 'mongodb';
import { EntityStoreWatchManager } from 'live-components-api';
import { Server, createServer } from 'http';
import express from 'express';

const app = express();
const server = new Server(app);
server.listen(5000);

app.use(express.static('./static'));
app.get('/', (req, res) => {
  res.send('Haa bhai');
});

(async () => {
  const client = await connect('mongodb://localhost:27017');
  const restaurant = client.db('test').collection('restaurant');
  const entityWatchManagerMongo: EntityStoreWatchManager = new EntityStoreWatchManagerMongo(
    restaurant,
  );
  const clientManager = new ClientManagerSocketIO(
    entityWatchManagerMongo,
    server,
  );
})();
