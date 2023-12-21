import express, { Request, Response, Router } from 'express';
import login from '../controllers/authentication/login';

// Create a router instance
const router: Router = express.Router();

// Define your main routes
router.post('/login', (req: Request, res: Response) => {
login(req,res);
});

// Export the router
export default router;
