import {
  ClientManager,
  EntityStoreWatchManager,
  EntityStoreWatchManagerEventPayloads,
} from 'live-components-api';
import { Collection, ChangeStream } from 'mongodb';
import { EventEmitter } from 'events';

export class EntityStoreWatchManagerMongo extends EventEmitter
  implements EntityStoreWatchManager {
  private collection: Collection;

  //@ts-ignore -- `changeStream` is assigned in `registerWatch`, which *is* called in the constructor
  private changeStream: ChangeStream;

  private registerWatch() {
    this.changeStream = this.collection.watch().on('change', chunk => {
      this.emit('entityChanged', {
        entity: { ...chunk, id: chunk.documentKey._id },
      } as EntityStoreWatchManagerEventPayloads.EntityChanged);
    });
  }

  constructor(collection: Collection) {
    super();
    this.collection = collection;

    this.registerWatch();
  }

  resumeWatch = () => {
    this.registerWatch();
  };

  pauseWatch = () => {
    this.changeStream.close();
    this.changeStream.removeAllListeners();
  };
}
