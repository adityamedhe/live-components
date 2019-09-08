import socketio from 'socket.io';    
import { Server, createServer } from 'http';
import { ClientManager, EntityStoreWatchManager, ClientMessages }  from 'live-components-api';

export class ClientManagerSocketIO implements ClientManager {
    private io: socketio.Server;
    private entityStoreWatchManager: EntityStoreWatchManager;

    
    constructor(entityStoreWatchManager: EntityStoreWatchManager, httpServer?: Server) {
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
        
        if (httpServer) {
            httpServerToUse = httpServer;
        } else {
            httpServerToUse = createServer();
            httpServerToUse.listen(5001);
        }
        
        this.io = socketio(httpServerToUse);
        
        this.io.on('connection', (socket) => {
            console.log(`Client connected: ${socket.id}`);
            socket.on('subscribeToEntity', (message: ClientMessages.SubscribeToEntity) => {
                console.log(`Subscribing client ${socket.id} to ${message.entityId}`);
                socket.join(message.entityId);
            });

            socket.on('unsubscribeFromEntity', (message: ClientMessages.UnsubscribeFromEntity) => {
                console.log(`Unsubscribing client ${socket.id} from ${message.entityId}`);
                socket.leave(message.entityId);
            });
        });


        this.entityStoreWatchManager.on('entityChanged', (payload) => {
            const changedEntityId = payload.entity.id;
            
            console.log('Entity changed, ', changedEntityId);
            this.io.to(changedEntityId).emit('entityChanged', payload);
        });
    }

    public setEntityStoreWatchManager = (entityStoreWatchManager: EntityStoreWatchManager) => {
        this.entityStoreWatchManager = entityStoreWatchManager;
    }
}
