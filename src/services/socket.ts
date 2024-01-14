// services/socket.ts

import { Server, Socket } from 'socket.io';
import http from 'http';
import socketioJwt from 'socketio-jwt';

const initializeSocket = (httpServer: http.Server) => {
  const io = new Server(httpServer, {
    cors: {
      origin: 'http://localhost:8080', // frontend URL
    },
  });
  // io.use((socket, next) => {
  //   socketioJwt.authorize({
  //     secret: 'your-secret-key',
  //     // handshake: true,
  //   })(socket, next as any);
  // });
  return io;
};

export { initializeSocket };
