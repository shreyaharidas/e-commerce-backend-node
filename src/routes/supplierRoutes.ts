import express, { Request, Response, Router } from 'express';
import { supplierRegistration } from '../controllers/supplierControllers/supplierRegistration.ts';

// Create a router instance
const router: Router = express.Router();

// Define your supplier-related routes
// router.get('/suppliers', (req, res) => {
//   res.send('List of suppliers');
// });

router.post('/supplierRegistration', (req: Request, res: Response) => {
  console.log(req);
  supplierRegistration(req, res); 
});

router.get('/suppliers/:id', (req: Request, res: Response) => {
  res.send(`Supplier profile for ID ${req.params.id}`);
});

// Export the router
export default router;
