import socketio from 'socket.io';
import { Server, createServer } from 'http';
import {
  ClientManager,
  EntityStoreWatchManager,
  ClientMessages,
  LiveComponentEntity,
} from 'live-components-api';

export class ClientManagerSocketIO<T extends LiveComponentEntity>
  implements ClientManager<T> {
  private io: socketio.Server;
  private entityStoreWatchManager: EntityStoreWatchManager<T>;

  constructor(
    entityStoreWatchManager: EntityStoreWatchManager<T>,
    httpServerOrPort: Server | number,
  ) {
    /**
     * Initialize the EntityStoreWatchManager instance that this client manager
     * will use as a backing data store to serve clients.
     */
    this.entityStoreWatchManager = entityStoreWatchManager;

    /**
     * If `httpServer` is provided then latch on the SocketIO instance on the provided server
     * This will be typically used for development purposes when we want the same server to
     * serve other pages as well as the SocketIO client library.
     *
     * If `httpServer` is not provided then start a new instance of our own and latch it to
     * SocketIO. This is how it will be used in production. That way, we place absolutely
     * no requirements on the client app to provide us with a server.
     */

    let httpServerToUse: Server;

    if (httpServerOrPort instanceof Server) {
      console.log(
        `LiveComponents ClientManager :: Reusing HttpServer instance provided.`,
      );

      httpServerToUse = httpServerOrPort as Server; // httpServerOrPort is an HTTP Server.
    } else {
      console.log(
        `LiveComponents ClientManager :: Starting new HttpServer at port ${httpServerOrPort}`,
      );

      // httpServerOrPort is a port number; we need to create a server listening on that port.
      httpServerToUse = createServer();
      httpServerToUse.listen(httpServerOrPort as number);
    }

    this.io = socketio(httpServerToUse);

    this.io.on('connection', socket => {
      console.log(
        `LiveComponents ClientManagerSocketIO :: Client connected: ${socket.id}`,
      );

      socket.on(
        'subscribeToEntity',
        async (message: ClientMessages.SubscribeToEntity) => {
          console.log(
            `LiveComponents ClientManagerSocketIO :: Subscribing client ${socket.id} to ${message.entityId}, also sending current entity value`,
          );
          socket.emit('entityChanged', {
            entity: await this.entityStoreWatchManager.getEntity(
              message.entityId,
            ),
          });
          socket.join(message.entityId);
        },
      );

      socket.on(
        'unsubscribeFromEntity',
        (message: ClientMessages.UnsubscribeFromEntity) => {
          console.log(
            `Unsubscribing client ${socket.id} from ${message.entityId}`,
          );
          socket.leave(message.entityId);
        },
      );
    });

    this.entityStoreWatchManager.on('entityChanged', payload => {
      const changedEntityId = payload.entity.id;

      console.log(
        'LiveComponents ClientManager :: Entity changed, ',
        changedEntityId,
      );

      this.io
        .to(changedEntityId)
        .emit('entityChanged', payload as ClientMessages.EntityChanged<T>);
    });
  }

  public setEntityStoreWatchManager = (
    entityStoreWatchManager: EntityStoreWatchManager<T>,
  ) => {
    this.entityStoreWatchManager = entityStoreWatchManager;
  };
}
