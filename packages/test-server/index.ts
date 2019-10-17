import express from 'express';
import { connect } from 'mongodb';

import { EntityStoreWatchManagerMongo } from 'entitystore-watch-manager-mongo';
import { ClientManagerSocketIO } from 'client-manager-socketio';
import { EntityStoreWatchManager, ClientManager } from 'live-components-api';

import { IStockInfo, ICompany } from './interfaces';
import {
  convertMongoIdToLiveComponentId,
  updateDocumentValueRandomly,
} from './util';

// Initialize Express app and HTTP Server
const app = express();
app.listen(5000, () => console.log('Express app listening on port 5000'));

(async () => {
  const client = await connect(
    'mongodb://localhost:27017',
    { useNewUrlParser: true, useUnifiedTopology: true },
  );

  const companies = client.db('test').collection('companies');
  const stockInfos = client.db('test').collection('stockinfos');

  updateDocumentValueRandomly(stockInfos, 'currentValue');

  app.use((req, res, next) => {
    res.set('access-control-allow-origin', '*');
    next();
  });

  app.get('/company/:symbol', async (req, res) => {
    const result = await companies.findOne({
      stockSymbol: req.params.symbol,
    });

    res.writeHead(200, { 'content-type': 'application/json' });
    res.write(JSON.stringify(convertMongoIdToLiveComponentId(result)));

    res.end();
  });

  app.get('/stock/:symbol', async (req, res) => {
    const result = await stockInfos.findOne({ _id: req.params.symbol });

    res.writeHead(200, { 'content-type': 'application/json' });
    res.write(JSON.stringify(convertMongoIdToLiveComponentId(result)));

    res.end();
  });

  const stockInfoEntityStoreWatchManager: EntityStoreWatchManager<
    IStockInfo
  > = new EntityStoreWatchManagerMongo(stockInfos);

  const stockInfoClientManager: ClientManager<
    IStockInfo
  > = new ClientManagerSocketIO(stockInfoEntityStoreWatchManager, 5001);
})();
