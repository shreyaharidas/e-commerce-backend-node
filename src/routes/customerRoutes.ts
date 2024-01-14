import express, { Request, Response, Router } from 'express';
import multer from 'multer';
import { customerRegistration } from '../controllers/customers/customerRegsitration';
import verifyToken from '../middleware/verifyjwt';
import { customerProfile } from '../controllers/customers/customerProfile';
import resetPassword from '../controllers/commonFunctionalities/resetPassword';
import { getProducts } from '../controllers/products/getProducts';
import addToCart from '../controllers/customers/cart/addToCart';
import updateCart from '../controllers/customers/cart/updateCart';
import getCart from '../controllers/customers/cart/getCart';
import { getUniqueProduct } from '../controllers/products/getUniqueProduct';

// Create a router instance
const router: Router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.post('/customerRegistration', upload.single("profile_pic"),(req: Request, res: Response) => {
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

router.post('/addToCart',verifyToken,(req:Request, res:Response)=>{
  addToCart(req,res);
})

router.patch('/updateCart',verifyToken,(req:Request, res:Response)=>{
  updateCart(req,res);
})

router.get('/getCart',verifyToken,(req:Request, res:Response)=>{
  getCart(req,res);
})

router.get('/getUniqueProduct/:_id', verifyToken, (req: Request, res: Response) => {
  getUniqueProduct(req,res);
});


// Export the router
export default router;
