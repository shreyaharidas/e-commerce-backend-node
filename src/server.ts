import * as dotenv from 'dotenv';
import express, {Express, Request, Response, NextFunction} from 'express';
import sequelize from './config/sequelize-config.ts';
import indexRoutes from './routes/index.ts';
import supplierRoutes from './routes/supplierRoutes.ts';
import customerRoutes from './routes/customerRoutes.ts'
import { connectToMongoDb, stopMongoDb } from './services/mongodb.ts';
import cors from 'cors';
import { sequelizeSync } from './services/sequelize.ts';
import { firstExampleMW, secondExampleMW } from './middleware/middlewareExample.ts';

dotenv.config(); // Load environment variables from .env
const app:Express = express();
const port = process.env.PORT || 3000; // Use the PORT variable from .env or default to 3000

app.use(cors());
// Add this line before app.use(express.json());
app.use(express.urlencoded({limit:"500kb", extended: true }));

app.use(express.json({limit:"500kb"}));

sequelizeSync();

// Sync the database

  connectToMongoDb();


  app.use((req, res, next)=>{

    console.log("hi from middleware");
  
    next();
  })


  interface CustomRequest extends Request {
    customProperty?: string;
  }

// Middleware to modify request
// app.use((req:Request, res:Response, next:NextFunction) => {
// firstExampleMW(req,res,next);
// });


// app.use((req, res, next) => {
//   secondExampleMW(req,res,next)
// });

// Route handler
app.get('/example', firstExampleMW,secondExampleMW,(req:CustomRequest, res:Response) => {
  console.log('Route Handler - Handling Request');
  
  // Access the modified request property
  const customProperty = req.customProperty ?? 'Not available';

  // Send a modified response
  res.send(`Response with Modified Request Property: ${customProperty}`);
});




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
