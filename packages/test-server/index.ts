import express from 'express';
import { EntityStoreWatchManagerMongo } from 'entitystore-watch-manager-mongo';
import { ClientManagerSocketIO } from 'client-manager-socketio';
import { connect } from 'mongodb';
import { Server } from 'http';
import {
  EntityStoreWatchManager,
  LiveComponentEntity,
} from 'live-components-api';

const app = express();
const server = new Server(app);
server.listen(5000);

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
