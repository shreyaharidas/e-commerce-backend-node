import { Request, Response } from 'express';
import { Db, ObjectId } from 'mongodb';
import { client } from "../../services/mongodb.ts";

const db: Db = client.db("e-commerce");

// Define the route to edit product stock
const editProducts = async (req: Request, res: Response) => {
  try {
    const { _id, updatedStock }: { _id: string, updatedStock: number } = req.body;

    // Validate required fields
    if (!_id || updatedStock<0) {
      return res.status(422).json({ error: 'Required fields are missing' });
    }

    // Convert _id to ObjectId
    const objectId = new ObjectId(_id);

    // Update the product stock
    const result = await db.collection('products').updateOne(
      { _id: objectId },
      { $set: { product_stock: updatedStock } }
    );

    if (result.modifiedCount >= 0) {
      res.status(200).json({ success: 'Product stock updated successfully' });
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.error('Error updating product stock:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { editProducts };
