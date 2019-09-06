import socketio from 'socket.io';
import { Server, createServer } from 'http';

export class ClientManagerSocketIO {
    private io: socketio.Server;

    constructor(httpServer?: Server) {
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
            console.log('Someone connected');
        });
    }
}
