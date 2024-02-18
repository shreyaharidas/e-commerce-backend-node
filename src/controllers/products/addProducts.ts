import { Request, Response } from "express";
import { Db } from "mongodb";
import { client } from "../../services/mongodb.ts";
import EcSuppliers from "../../models/ec_suppliers.ts";
import AWS from "aws-sdk";
import { Readable } from "stream";
import { ManagedUpload } from "aws-sdk/lib/s3/managed_upload";
import { s3UploadAsync } from "../../utils/s3uploadAsync.ts";

let db: Db = client.db("e-commerce");

const s3 = new AWS.S3({
  accessKeyId: "AKIAW3MEC2CXQZDAUQVW",
  secretAccessKey: "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",
});

const addProducts = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  try {
    // const product: {
    //   product_name: string;
    //   product_category: string;
    //   product_price: string;
    //   product_stock: string;
    //   [key: string]: string | number;
    // }[] = req.body;

    const {
      product_name,
      product_category,
      product_price,
      product_stock,
      ...otherData
    } = req.body;

    const file = req?.file as Express.Multer.File;

    const params: AWS.S3.PutObjectRequest = {
      Bucket: "ecommerce123",
      Key: file?.originalname,
      Body: Readable.from(file?.buffer),
      ContentType: file?.mimetype,
    };

    // Validate required fields
    if (
      !product_name ||
      !product_category ||
      !product_price ||
      !product_stock ||
      !req?.file
    ) {
      return res.status(422).json({ error: "Required fields are missing" });
    }

    let supplier_reg_details = await EcSuppliers.findOne({
      where: { id: req.body.jwt_decoded.userId },
      raw: true,
      attributes: ["registration_id"],
    });

    if (!supplier_reg_details) {
      return res
        .status(403)
        .json({ message: "Authorization error! Registration data not found!" });
    }

    // Access the 'products' collection
    const productsCollection = db.collection("products");
    try {
      const product_pic_url = await s3UploadAsync(params);

      // Create a product document
      const productDocument = {
        supplier_reg_id: supplier_reg_details?.registration_id,
        product_name,
        product_category,
        product_price,
        product_stock,
        product_photo: product_pic_url,
        ...otherData,
      };

      delete productDocument.jwt_decoded;
      // Insert the product document

      await productsCollection.insertOne(productDocument);

      // Respond with success message
      return res.status(201).json({ message: "Product added successfully" });
    } catch (err) {
      throw err;
    }
  } catch (error) {
    console.error("Error inserting product:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export { addProducts };
