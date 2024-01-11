import * as dotenv from 'dotenv';
import express, {Express, Request, Response, NextFunction} from 'express';
import sequelize from './config/sequelize-config.ts';
import indexRoutes from './routes/index.ts';
import supplierRoutes from './routes/supplierRoutes.ts';
import customerRoutes from './routes/customerRoutes.ts';
import { connectToMongoDb, stopMongoDb } from './services/mongodb.ts';
import cors from 'cors';
import { initializeSocket } from './services/socket.ts';
import { initializeIO } from './services/io.ts';
import http from 'http';

import { sequelizeSync } from './services/sequelize.ts';
import { firstExampleMW, secondExampleMW } from './middleware/middlewareExample.ts';

dotenv.config(); // Load environment variables from .env
const app:Express = express();
const port = process.env.PORT || 3000; // Use the PORT variable from .env or default to 3000
const server = http.createServer(app);

const corsOptions = {
  Accept: 'application/json, text/plain',
  origin: 'http://localhost:8080',

};

app.use(cors(corsOptions));
app.use(express.urlencoded({ limit: '500kb', extended: true }));
app.use(express.json({ limit: '500kb' }));

sequelizeSync();


connectToMongoDb();

// Initialize Socket.IO
const io = initializeSocket(server);

// Initialize the io instance
initializeIO(io);

app.use(indexRoutes);
app.use('/api/v1', supplierRoutes);
app.use('/api/v2', customerRoutes);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

process.on('SIGINT', () => {
  sequelize.close();
  stopMongoDb();
  process.exit();
});

process.on('exit', () => {
  sequelize.close();
  stopMongoDb();
});
