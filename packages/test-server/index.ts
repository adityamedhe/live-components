import { EntityStoreWatchManagerMongo } from 'entitystore-watch-manager-mongo';
import { ClientManagerSocketIO } from 'client-manager-socketio';
import { connect } from 'mongodb';
import {
  EntityStoreWatchManager,
  LiveComponentEntity,
} from 'live-components-api';
import { Server } from 'http';
import express from 'express';

const app = express();
const server = new Server(app);
server.listen(5000);

app.use(express.static('./static'));

interface IRestaurant extends LiveComponentEntity {
  name: string;
}

(async () => {
  const client = await connect('mongodb://localhost:27017');
  const restaurant = client.db('test').collection('restaurant');
  const entityWatchManagerMongo: EntityStoreWatchManager<
    IRestaurant
  > = new EntityStoreWatchManagerMongo(restaurant);

  const clientManager = new ClientManagerSocketIO<IRestaurant>(
    entityWatchManagerMongo,
    server,
  );
})();
