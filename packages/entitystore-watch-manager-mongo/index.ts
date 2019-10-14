import {
  ClientManager,
  EntityStoreWatchManager,
  EntityStoreWatchManagerEventPayloads,
  LiveComponentEntity,
} from 'live-components-api';
import { Collection, ChangeStream } from 'mongodb';
import { EventEmitter } from 'events';

export class EntityStoreWatchManagerMongo<T extends LiveComponentEntity>
  extends EventEmitter
  implements EntityStoreWatchManager<T> {
  private collection: Collection;

  //@ts-ignore -- `changeStream` is assigned in `registerWatch`, which *is* called in the constructor
  private changeStream: ChangeStream;

  private registerWatch() {
    this.changeStream = this.collection.watch().on('change', chunk => {
      this.emit('entityChanged', {
        entity: { id: chunk.fullDocument._id, ...chunk.fullDocument },
      } as EntityStoreWatchManagerEventPayloads.EntityChanged<T>);
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
