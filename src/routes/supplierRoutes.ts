import express, { Request, Response, Router } from 'express';
import { supplierRegistration } from '../controllers/supplierControllers/supplierRegistration.ts';
import verifyToken from '../middleware/verifyjwt.ts';
import resetPassword from '../controllers/commonFunctionalities/resetPassword.ts';
import { supplierProfile } from '../controllers/supplierControllers/supplierProfile.ts';
import { getProductsSupplier } from '../controllers/products/getProductsSupplier.ts';
import { addProducts } from '../controllers/products/addProducts.ts';
import { editProducts } from '../controllers/products/editProducts.ts';
import { Server } from 'socket.io';
import { initializeIO } from '../services/io.ts';
import { getIO } from '../services/io.ts';

// Create a router instance
const router: Router = express.Router();

// Initialize the io instance using the getIO function
const io = getIO();

router.post('/supplierRegistration', (req: Request, res: Response) => {
  supplierRegistration(req, res); 
});

router.get('/supplierProfile',verifyToken,(req:Request, res:Response)=>{
  supplierProfile(req,res);
})

router.patch('/resetPassword',verifyToken,(req:Request, res:Response)=>{
  resetPassword(req,res);
})

router.get('/getProductsSupplier', verifyToken, (req: Request, res: Response) => {
  getProductsSupplier(req,res);
});

router.post('/addProducts', verifyToken,(req: Request, res: Response) => {
  addProducts(req,res);
});

router.patch('/editProducts', verifyToken, (req: Request, res: Response) => {
  if (io) {
    editProducts(req, res, io);
  } else {
    res.status(500).json({ error: 'Socket.IO not initialized' });
  }
});
// Export the router

export default router;

