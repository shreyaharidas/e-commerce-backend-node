import { Request, Response } from 'express';
import EcCart from '../../../models/ec_cart';
import { Db } from 'mongodb';
import { client } from '../../../services/mongodb';
import { ObjectId } from 'mongodb';


const getCart = async (req: Request, res: Response) => {
  try {
    const { registration_id } = req.query;

    // Validate required fields
    if (!registration_id) {
      return res.status(422).json({ error: 'Registration ID is required' });
    }

    // Find cart entries for the given registration_id
    const cartEntries = await EcCart.findAll({
      where: {
        registration_id,
      },
      raw:true,
    });

    if (!cartEntries || cartEntries.length === 0) {
      return res.status(404).json({ error: 'No items in your cart' });
    }

    // Extract product_ids from cart entries
    const productIds = cartEntries.map((entry) => entry.product_id);
    const objectIds = productIds.map((id) => new ObjectId(id));

    // Connect to MongoDB
    const db: Db = client.db('e-commerce');

    // Fetch product details from the products collection
    const products = await db
  .collection('products')
  .find({ _id: { $in: objectIds } })
  .toArray();
  
    // Map product details to corresponding cart entries
    const cartDetails = cartEntries.map((entry) => {
      const productDetail = products.find((product) => product._id.toString() === entry.product_id);

      if (!productDetail) {
        // Handle the case where product details are not found (Optional)
        return {...entry}
      }

      // Exclude product_stock from product details
      const { product_stock, ...restProductDetail } = productDetail;

      return {...entry,...restProductDetail};
    });

    res.status(200).json({ cartDetails });
  } catch (error) {
    console.error('Error fetching cart details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default getCart;
