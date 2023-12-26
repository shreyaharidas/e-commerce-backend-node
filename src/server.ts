import * as dotenv from 'dotenv';
import express from 'express';
import sequelize from './config/sequelize-config.ts';
import indexRoutes from './routes/index.ts';
import supplierRoutes from './routes/supplierRoutes.ts';
import customerRoutes from './routes/customerRoutes.ts';
import { connectToMongoDb, stopMongoDb } from './services/mongodb.ts';
import cors from 'cors';
import { initializeSocket } from './services/socket.ts';
import { initializeIO } from './services/io.ts';
import http from 'http';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);

app.use(cors());
app.use(express.urlencoded({ limit: '500kb', extended: true }));
app.use(express.json({ limit: '500kb' }));

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err: Error) => {
    console.error('Unable to connect to the database:', err);
  });

sequelize
  .sync({ force: false })
  .then(() => {
    console.log('Database synced');
  })
  .catch((error: Error) => {
    console.error('Error syncing database:', error);
  });

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
});

process.on('exit', () => {
  sequelize.close();
  stopMongoDb();
});
