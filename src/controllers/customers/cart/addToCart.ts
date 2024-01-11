import { Request, Response } from 'express';
import EcCart from '../../../models/ec_cart';

const addToCart= async (req: Request, res: Response) => {

    try {
        const products:{ _id: string; registration_id: string; quantity: number }[] = req.body;
    
        // Validate required fields
        if (!products || !Array.isArray(products) || products.length === 0) {
          return res.status(422).json({ error: 'Invalid or empty product array' });
        }
    
        // Create an array to store created cart entries
        const cartEntries = [];
    
        // Create cart entries for each product
        for (const product of products) {
          const { _id, registration_id, quantity } = product;
    
          // Validate required fields for each product
          if (!_id || !registration_id || !quantity) {
            return res.status(422).json({ error: 'Required fields are missing for a product' });
          }
        
          // Create a new cart entry
          const cartEntry = await EcCart.create({
            product_id: _id,
            registration_id,
            quantity,
          });
    
          cartEntries.push(cartEntry);
        }
    
        res.status(201).json({ success: 'Products added to cart successfully', cartEntries });
      } catch (error) {
        console.error('Error adding products to cart:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
};

export default addToCart;


