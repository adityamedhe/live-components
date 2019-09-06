import { EntityStoreWatchManagerMongo } from 'entitystore-watch-manager-mongo';
import { connect } from 'mongodb';

(async () => {
    const client = await connect('mongodb://localhost:27017');
    const restaurant = client.db('test').collection('restaurant');
    const entityWatchManagerMongo = new EntityStoreWatchManagerMongo(restaurant);
    await entityWatchManagerMongo.enableWatch();
})();

