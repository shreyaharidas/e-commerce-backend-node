import express, { Request, Response, Router } from 'express';
import { supplierRegistration } from '../controllers/supplierControllers/supplierRegistration.ts';
import verifyToken from '../middleware/verifyjwt.ts';
import resetPassword from '../controllers/commonFunctionalities/resetPassword.ts';
import { supplierProfile } from '../controllers/supplierControllers/supplierProfile.ts';

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

router.get('/supplierProfile',verifyToken,(req:Request, res:Response)=>{
  supplierProfile(req,res);
})

router.patch('/resetPassword',verifyToken,(req:Request, res:Response)=>{
  resetPassword(req,res);
})

router.get('/suppliers/:id', (req: Request, res: Response) => {
  res.send(`Supplier profile for ID ${req.params.id}`);
});

// Export the router
export default router;
