import * as dotenv from 'dotenv';
import express from 'express';
import sequelize from './config/sequelize-config.ts';
import indexRoutes from './routes/index.ts';
import supplierRoutes from './routes/supplierRoutes.ts';
import customerRoutes from './routes/customerRoutes.ts'
import { connectToMongoDb, stopMongoDb } from './services/mongodb.ts';
import { sequelizeSync } from './services/sequelize.ts';

dotenv.config(); // Load environment variables from .env
const app = express();
const port = process.env.PORT || 3000; // Use the PORT variable from .env or default to 3000


// Add this line before app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

sequelizeSync();

// Sync the database

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
