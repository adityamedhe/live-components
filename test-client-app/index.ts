import { EntityStoreWatchManagerMongo } from 'entitystore-watch-manager-mongo';
import { ClientManagerSocketIO } from 'client-manager';
import { connect } from 'mongodb';
import {EntityStoreWatchManager} from 'live-components-api';
import { Server, createServer } from 'http';

(async () => {
    const client = await connect('mongodb://localhost:27017');
    const restaurant = client.db('test').collection('restaurant');
    const entityWatchManagerMongo: EntityStoreWatchManager = new EntityStoreWatchManagerMongo(restaurant);

    entityWatchManagerMongo.on('entityChanged', (chunk) => {
        console.log(chunk);
    });

    setTimeout(() => {
        console.log('Watch stopped');
        entityWatchManagerMongo.pauseWatch();

        setTimeout(() => {
            console.log('Watch started again.');
            entityWatchManagerMongo.resumeWatch();
        }, 5000);
    }, 5000);

    // const server = createServer();
    // server.listen(5000);

    const clientManager = new ClientManagerSocketIO();
})();
