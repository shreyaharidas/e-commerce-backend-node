import express, { Request, Response, Router } from 'express';
import { customerRegistration } from '../controllers/customers/customerRegsitration';
import verifyToken from '../middleware/verifyjwt';
import { customerProfile } from '../controllers/customers/customerProfile';
import resetPassword from '../controllers/commonFunctionalities/resetPassword';
import { getProducts } from '../controllers/products/getProducts';

// Create a router instance
const router: Router = express.Router();


router.post('/customerRegistration', (req: Request, res: Response) => {
  customerRegistration(req, res); 
});

router.get('/customerProfile',verifyToken,(req:Request, res:Response)=>{
  customerProfile(req,res);
})

router.patch('/resetPassword',verifyToken,(req:Request, res:Response)=>{
  resetPassword(req,res);
})

router.get('/getProducts',verifyToken,(req:Request, res:Response)=>{
  getProducts(req,res);
})

// Export the router
export default router;
