import express, { Request, Response, Router } from 'express';
import { customerRegistration } from '../controllers/customers/customerRegsitration';

// Create a router instance
const router: Router = express.Router();


router.post('/customerRegistration', (req: Request, res: Response) => {
  customerRegistration(req, res); 
});


// Export the router
export default router;
