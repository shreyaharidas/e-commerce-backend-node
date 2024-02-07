// server.ts

import * as dotenv from 'dotenv';
import express, { Express } from 'express';
import http from 'http';
import { sequelizeSync } from './services/sequelize.ts';
import { connectToMongoDb, stopMongoDb } from './services/mongodb.ts';
import cors from 'cors';
import { initializeSocket } from './services/socket.ts';
import socketioJwt from 'socketio-jwt';
import sequelize from './config/sequelize-config.ts';

import { Server, Socket } from 'socket.io';
import supplierRoutes from './routes/supplierRoutes.ts';
import customerRoutes from './routes/customerRoutes.ts';
import indexRoutes from './routes/index.ts';
import envConfig from './config/envConfig.ts';

dotenv.config();

export const app: Express = express();
const port = process.env.PORT || 3000;
export const server = http.createServer(app);
export const io = initializeSocket(server);


io.on('connection', (socket: Socket) => {
  console.log('A user connected');
  socket.on('out of stock emit received', () => {
    console.log('Received from frontend also');
  });
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const corsOptions = {
  origin: `${envConfig.cors_origin}`,
};

sequelizeSync();
connectToMongoDb();

app.use(cors(corsOptions));
app.use(express.urlencoded({ limit: '500kb', extended: true }));
app.use(express.json({ limit: '500kb' }));
// Add other middleware and routes...
app.use(indexRoutes);
app.use('/api/v1', supplierRoutes);
app.use('/api/v2', customerRoutes);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

server.listen("3001", ()=>{
  console.log("socket in 3001")
})

process.on('SIGINT', () => {
  sequelize.close();
  stopMongoDb();
  process.exit();
});

process.on('exit', () => {
  sequelize.close();
  stopMongoDb();
});
