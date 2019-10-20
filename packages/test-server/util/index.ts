import { readFileSync } from 'fs';

import { LiveComponentEntity } from 'live-components-api';
import { Collection } from 'mongodb';
import { IStockInfo, StockTrendDirection } from '../interfaces';

export const convertMongoIdToLiveComponentId = (
  doc: any,
): LiveComponentEntity => ({ ...doc, id: doc._id, _id: undefined });

export const updateStockInfosRandomly = (
  stockInfosJsonFile: any,
  collection: Collection,
) => {
  const stockInfos = JSON.parse(stockInfosJsonFile);

  setInterval(async () => {
    for (const stockInfo of stockInfos) {
      let filter: any = {};
      let update: any = {};

      filter[`_id`] = stockInfo[`_id`];
      update = {
        $set: {
          currentValue: Math.random() * 100,
          trend: {
            percentage: Math.random() * 10,
            direction:
              Math.random() * 100 < 50
                ? StockTrendDirection.DOWN
                : StockTrendDirection.UP,
          },
        },
      };

      await collection.updateOne(filter, update);
    }
  }, 2000);
};
