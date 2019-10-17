import { LiveComponentEntity } from 'live-components-api';
import { Collection } from 'mongodb';

export const convertMongoIdToLiveComponentId = (
  doc: any,
): LiveComponentEntity => ({ ...doc, id: doc._id, _id: undefined });

export const updateDocumentValueRandomly = (
  collection: Collection,
  path: string,
) => {
  setInterval(async () => {
    await collection.updateMany(
      {},
      { $set: { [path]: (Math.random() * 100).toFixed(1) } },
    );
  }, 5000);
};
