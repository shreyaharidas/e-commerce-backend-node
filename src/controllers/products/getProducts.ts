import { Request, Response } from 'express';
import { Db } from 'mongodb';
import { client } from "../../services/mongodb.ts"

let db: Db= client.db("e-commerce");

// Define the route to get products
const getProducts=async (req: Request, res: Response) => {
  try {
    const pipeline = [
        {
          $group: {
            _id: '$product_category',
            products: { $push: '$$ROOT' },
          },
        },
      ];
      
      const products = await db.collection('products').aggregate(pipeline).toArray();
      

    res.status(200).json({products});
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export {getProducts};
