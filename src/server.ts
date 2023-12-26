import * as dotenv from 'dotenv';
import express from 'express';
import sequelize from './config/sequelize-config.ts';
import indexRoutes from './routes/index.ts';
import supplierRoutes from './routes/supplierRoutes.ts';
import customerRoutes from './routes/customerRoutes.ts'
import { connectToMongoDb, stopMongoDb } from './services/mongodb.ts';
import cors from 'cors';

dotenv.config(); // Load environment variables from .env
const app = express();
const port = process.env.PORT || 3000; // Use the PORT variable from .env or default to 3000

app.use(cors());
// Add this line before app.use(express.json());
app.use(express.urlencoded({limit:"500kb", extended: true }));

app.use(express.json({limit:"500kb"}));

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err: Error) => {
    console.error('Unable to connect to the database:', err);
  });

// Sync the database
sequelize.sync({ force: false }) // Set force to true to drop and recreate tables on every application start
  .then(() => {
    console.log('Database synced');
  })
  .catch((error: Error) => {
    console.error('Error syncing database:', error);
  });

  connectToMongoDb();


  
// Define routes
app.use(indexRoutes);
app.use('/api/v1', supplierRoutes);
app.use('/api/v2',customerRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

process.on("SIGINT",()=>{
  sequelize.close(); stopMongoDb();
})

process.on("exit",()=>{
  sequelize.close(); stopMongoDb();
})
