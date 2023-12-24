import { Request, Response } from 'express';
import { Db } from 'mongodb';
import { client } from "../../services/mongodb.ts"
import { ParsedQs } from 'qs';
import { SearchQueryTypegetAllProducts, searchQueryType } from '../../../types/productTypes/index.ts';
import { pipeline } from 'stream';

let db: Db= client.db("e-commerce");

// Define the route to get products
const getProducts=async (req: Request, res: Response) => {

  const { offset, sortBy, sortOrder, search }: ParsedQs = req.query
  try {

    type PipelineType = Array<{
      $group?: {
        _id: string;
        products: { $push: string };
      };
      $match?: {
        $or: Array<{ [x: string]: { $regex: string; $options: string; } }>;
      };
      $sort?: { [x: string]: number; }; 
      $skip?: number;
      $limit?:number;
    }>;

    let pipeline:PipelineType = [
        {
          $group: {
            _id: '$product_category',
            products: { $push: '$$ROOT' },
          },
        },
      ];
      
      if (search) {

        const regex = new RegExp(search as string, 'i');
        const collectionKeys: string[] = ["products.product_name", "products.product_category"];
        
        const $or = collectionKeys.map(key => ({ [key]: { $regex: regex.source, $options: regex.flags } }));

      
        const matchStage = { $match: { $or } };
        pipeline.push(matchStage);
      }

if (sortBy && sortOrder) {
  const sortStage = { $sort: { [`products.${sortBy as string}`]: sortOrder === '1' ? 1 : -1 } };
  pipeline.push(sortStage);
}

if (offset) {
  const offsetStage = { $skip: parseInt(offset as string, 10) };
  pipeline.push(offsetStage);
}

const limitStage={$limit:10};
pipeline.push(limitStage);

      const products = await db.collection('products').aggregate(pipeline).toArray();
      

    res.status(200).json({products});
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export {getProducts};
