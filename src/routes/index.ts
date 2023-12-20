import express, { Request, Response, Router } from 'express';

// Create a router instance
const router: Router = express.Router();

// Define your main routes
router.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the main page!');
});

// Export the router
export default router;
