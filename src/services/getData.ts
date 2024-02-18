import { searchQueryType } from "../../types/productTypes";
import { client, Db, Sort } from "./mongodb";

let db: Db = client.db("e-commerce");
export const getData = async (
  searchQuery: Partial<searchQueryType>,
  skip: number,
  sorting: Sort
) => {
  return await db
    .collection("products")
    .find(searchQuery, {
      projection: {
        // product_name: 1,
        // product_category: 1,
        // product_price: 1,
        // product_stock: 1,
        // product_photo: 1,
        _id: 0,
        supplier_reg_id: 0,
      },
    })
    .skip(skip)
    .limit(10)
    .sort(sorting)
    .toArray();
};
