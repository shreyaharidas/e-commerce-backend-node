import express, { Request, Response, Router } from 'express';
import multer from 'multer';
import { supplierRegistration } from '../controllers/supplierControllers/supplierRegistration.ts';
import verifyToken from '../middleware/verifyjwt.ts';
import resetPassword from '../controllers/commonFunctionalities/resetPassword.ts';
import { supplierProfile } from '../controllers/supplierControllers/supplierProfile.ts';
import { getProductsSupplier } from '../controllers/products/getProductsSupplier.ts';
import { addProducts } from '../controllers/products/addProducts.ts';
import { editProducts } from '../controllers/products/editProducts.ts';
import { getUniqueProduct } from '../controllers/products/getUniqueProduct.ts';
// import { io } from '../server.ts';


// Create a router instance
const router: Router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Initialize the io instance using the getIO function

router.post('/supplierRegistration', upload.single("profile_pic"), (req: Request, res: Response) => {
  supplierRegistration(req, res); 
});

router.get('/supplierProfile',verifyToken,(req:Request, res:Response)=>{
  supplierProfile(req,res);
})

router.patch('/resetPassword',verifyToken,(req:Request, res:Response)=>{
  resetPassword(req,res);
})

router.get('/getProductsSupplier',(req: Request, res: Response) => {
  getProductsSupplier(req,res);
});

router.get('/getUniqueProduct/:_id', verifyToken, (req: Request, res: Response) => {
  getUniqueProduct(req,res);
});

router.post('/addProducts',upload.single("product_photo"), verifyToken ,(req: Request, res: Response) => {
  addProducts(req,res);
});

router.patch('/editProducts', verifyToken, (req: Request, res: Response) => {
  // try {
  //   if(io)
    editProducts(req, res);
  // } catch(err:unknown) {
  //   res.status(500).json({ error: err?.toString() });
  // }
});
// Export the router

export default router;

