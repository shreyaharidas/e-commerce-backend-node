import * as dotenv from 'dotenv';
import express, {Express, Request, Response, NextFunction} from 'express';
import sequelize from './config/sequelize-config.ts';
import indexRoutes from './routes/index.ts';
import supplierRoutes from './routes/supplierRoutes.ts';
import customerRoutes from './routes/customerRoutes.ts'
import { firstExampleMW, secondExampleMW } from './middleware/middlewareExample.ts';

dotenv.config(); // Load environment variables from .env
const app:Express = express();
const port = process.env.PORT || 3000; // Use the PORT variable from .env or default to 3000


// Add this line before app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
// Sync the database
sequelize.sync({ force: false }) // Set force to true to drop and recreate tables on every application start
  .then(() => {
    console.log('Database synced');
  })
  .catch((error: Error) => {
    console.error('Error syncing database:', error);
  });


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


// app.js





// Example usage in app.js

// const User = require('./models/User');

// // Create a new user
// User.create({
//   name: 'John Doe',
// })
//   .then((user) => {
//     console.log('User created:', user.toJSON());
//   })
//   .catch((error) => {
//     console.error('Error creating user:', error);
//   });

// // Fetch all users
// User.findAll()
//   .then((users) => {
//     console.log('All users:', users.map((user) => user.toJSON()));
//   })
//   .catch((error) => {
//     console.error('Error fetching users:', error);
//   });
