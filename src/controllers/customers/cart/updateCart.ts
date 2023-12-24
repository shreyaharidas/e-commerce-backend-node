import { Request, Response } from 'express';
import EcCart from '../../../models/ec_cart';

//ADD ERROR HANDLING TO CHECK FOR STOCK BEFORE UPDATING!!!

const updateCart = async (req: Request, res: Response) => {
  try {
    const updates = req.body as { _id: string; registration_id: string; quantity: number }[];

    // Validate required fields
    if (!updates || !Array.isArray(updates) || updates.length === 0) {
      return res.status(422).json({ error: 'Invalid or empty updates array' });
    }

    // Create an array to store updated cart entries
    const updatedCartEntries = [];

    // Process updates for each product
    for (const update of updates) {
      const { _id, registration_id, quantity } = update;

      // Validate required fields for each update
      if (!_id || !registration_id) {
        return res.status(422).json({ error: 'Required fields are missing for an update' });
      }

      // Find the cart entry by product ID and registration ID
      const cartEntry = await EcCart.findOne({
        where: {
          product_id: _id,
          registration_id,
        },
      });
      
      if(cartEntry){
           // Update the quantity if provided
        if (quantity !== undefined) {
            cartEntry.quantity = quantity;
            // Save the updated cart entry
            await cartEntry.save();
            updatedCartEntries.push(cartEntry);
          }
      }
      if (!cartEntry) {
        let newCartEntry = await EcCart.create({
            product_id: _id,
            registration_id,
            quantity,
          });
          updatedCartEntries.push(newCartEntry);
      }
    }

    res.status(200).json({ success: 'Cart updated successfully', updatedCartEntries });
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default updateCart;
