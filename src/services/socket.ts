import { Server,Socket } from 'socket.io';
import http from 'http';
import socketioJwt from 'socketio-jwt';


const initializeSocket = (server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>) => {
  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:3000', // Replace with your frontend URL
      methods: ['GET', 'POST'],
    },
  });

  io.use((socket, next) => {
    socketioJwt.authorize({
      secret: 'your-secret-key', // replace with your actual secret key
    })(socket, next);
  });
  
  io.on('connection', (socket: Socket) => {
    console.log('A user connected');

    // Handle your socket events here

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });

  return io;
};

export {initializeSocket};
