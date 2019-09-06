import { Collection } from 'mongodb';

export class EntityStoreWatchManagerMongo {
    private collection: Collection;

    constructor(collection: Collection) {
        this.collection = collection;
    }

    public setCollection = (collection: Collection) => {
        this.collection = collection;
    }

    public enableWatch = async () => {
        this.collection.watch().on('change', (chunk) => console.log(chunk));
        console.log(`Started watching ${this.collection.collectionName}`);
    }
}