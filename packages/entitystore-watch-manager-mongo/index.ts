import {
  EntityStoreWatchManager,
  EntityStoreWatchManagerEventPayloads,
  LiveComponentEntity,
} from 'live-components-api';
import { Collection, ChangeStream, ObjectId } from 'mongodb';
import { EventEmitter } from 'events';

export class EntityStoreWatchManagerMongo<T extends LiveComponentEntity>
  extends EventEmitter
  implements EntityStoreWatchManager<T> {
  private collection: Collection;

  //@ts-ignore -- `changeStream` is assigned in `registerWatch`, which *is* called in the constructor
  private changeStream: ChangeStream;

  private registerWatch() {
    this.changeStream = this.collection.watch().on('change', (chunk: any) => {
      let updateToSend: T;

      switch (chunk.operationType) {
        case 'update':
          updateToSend = chunk.updateDescription.updatedFields;
          break;
        case 'replace':
          updateToSend = chunk.fullDocument;
          break;
      }

      this.emit('entityChanged', {
        entity: { id: chunk.documentKey._id.toString(), ...updateToSend! },
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

  getEntity = async (entityId: string) => {
    return this.collection.findOne({ _id: new ObjectId(entityId) });
  };
}
