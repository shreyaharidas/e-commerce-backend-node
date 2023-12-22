import { Request, Response } from 'express';
import { Db } from 'mongodb';
import { client } from "../../services/mongodb.ts"

let db: Db= client.db("e-commerce");

// Define the route to get products
const getProductsSupplier=async (req: Request, res: Response) => {
  try {
    const supplierRegId = req.body.supplier_reg_id;

    if (!supplierRegId) {
      // If supplier_name is not provided in the request body, return an error
      return res.status(422).json({ error: 'Supplier Registration Id required in the request body' });
    }
    const products = await db.collection('products').find({ supplier_reg_id: supplierRegId }).toArray();

    // if ( products.length===0){

    //     res.status(200).json({products:[]})

    // }
    res.status(200).json({products});
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export {getProductsSupplier};
