import { EntityStoreWatchManagerMongo } from 'entitystore-watch-manager-mongo';
import { ClientManagerSocketIO } from 'client-manager';
import { connect } from 'mongodb';
import { Server, createServer } from 'http';

(async () => {
    const client = await connect('mongodb://localhost:27017');
    const restaurant = client.db('test').collection('restaurant');
    const entityWatchManagerMongo = new EntityStoreWatchManagerMongo(restaurant);
    await entityWatchManagerMongo.enableWatch();

    // const server = createServer();
    // server.listen(5000);

    const clientManager = new ClientManagerSocketIO();
})();

