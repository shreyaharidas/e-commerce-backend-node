import { Request, Response } from 'express';
import { Db } from 'mongodb';
import { client } from "../../services/mongodb.ts";
import EcSuppliers from '../../models/ec_suppliers.ts';

let db: Db = client.db("e-commerce");


const addProducts = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
        const { product_name, product_category, product_price,product_stock, product_photo, ...otherData } = req.body;

        // Validate required fields
        if (!product_name || !product_category ||!product_price|| !product_stock || !product_photo) {
            return res.status(422).json({ error: 'Required fields are missing' });
        }

        let supplier_reg_details = await EcSuppliers.findOne({ where: { id: req.body.jwt_decoded.userId }, raw: true, attributes: ["registration_id"] })

        if (!supplier_reg_details) {
            return res.status(403).json({ message: "Authorization error! Registration data not found!" })
        }

        // Access the 'products' collection
        const productsCollection = db.collection('products');

        // Create a product document
        const productDocument = {
            supplier_reg_id:supplier_reg_details?.registration_id,
            product_name,
            product_category,
            product_price,
            product_stock,
            product_photo: Buffer.from(product_photo, 'base64'), // Assuming product_photo is a base64-encoded string
            ...otherData,
        };

        delete productDocument.jwt_decoded;
        // Insert the product document
        await productsCollection.insertOne(productDocument);

        // Respond with success message
        return res.status(201).json({ message: 'Product added successfully' });
    } catch (error) {
        console.error('Error inserting product:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

export { addProducts };