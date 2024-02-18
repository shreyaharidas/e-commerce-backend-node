import { Request, Response } from 'express';
import { ParsedQs } from 'qs';
import { searchQueryType } from '../../../types/productTypes/index.ts';
import { getData } from '../../services/getData.ts';

const getProductsSupplier = async (req: Request, res: Response) => {

    try {
        const supplierRegId = req?.query?.supplier_reg_id as string;

        const { offset, sortBy, sortOrder, search }: ParsedQs = req.query

        if (!supplierRegId) {
                                                                                                                                                                                                                                                                                                                                                         
            return res.status(422).json({ error: 'Supplier Registration ID required in the request' });
        }

        let searchQuery: Partial<searchQueryType>;
        searchQuery={ supplier_reg_id: supplierRegId as string }
        if (search) {

            const regex = new RegExp(search as string, 'i');

            const collectionKeys: string[] = ["product_name", "product_category"];
            
            
                (searchQuery as searchQueryType).$or = collectionKeys.map(key => ({ [key]: { $regex: regex } }));
        }

let skip:number=0;
let sorting={};

if(offset){
    skip=parseInt(offset as string);
}


if(sortBy &&sortOrder){
    sorting={[sortBy  as string]:parseInt(sortOrder  as string)}
    }

        let products = await getData(searchQuery, skip, sorting);
        return res.status(200).json({count:products.length, products });
    } catch (error) {
        console.error('Error fetching products:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};



export { getProductsSupplier};
