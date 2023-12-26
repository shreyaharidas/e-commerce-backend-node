import { Server } from 'socket.io';

let io: Server | undefined;

// Define a function to initialize io
export const initializeIO = (ioInstance?: Server) => {
  if (ioInstance) {
    io = ioInstance;
  }
  return io;
};

// Export a function to get the current io instance
export const getIO = () => io;
