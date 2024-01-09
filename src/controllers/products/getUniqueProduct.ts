import express, { Request, Response } from 'express';
import { ObjectId, Db } from 'mongodb';

import { client } from "../../services/mongodb.ts"

let db: Db = client.db("e-commerce");
const DB_NAME = 'e-commerce';
const COLLECTION_NAME = 'products';

const getUniqueProduct=async (req: Request, res: Response)=>{
    try {
         
        // Extract the product ID from the request params
        const productId = req.params._id.replace(":","");
    
        // Find the product in the collection by ObjectID
        const product = await db.collection(COLLECTION_NAME).findOne({ _id: new ObjectId(productId) });
    
        // if (!product) {
        //   res.status(404).json({ error: 'Product not found' });
        // } else {
        //   Send the product details as a JSON response
          res.status(200).json({product});
        // }
    
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
}

export {getUniqueProduct};