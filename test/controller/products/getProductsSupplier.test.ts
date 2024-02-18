import { Request, Response } from 'express';
import * as sinon from 'sinon';
import { getProductsSupplier } from '../../../src/controllers/products/getProductsSupplier';
import { searchQueryType } from '../../../types/productTypes';
import { Sort } from 'mongodb';
import * as serviceGetData from '../../../src/services/getData';


const mockProducts = {
    "count": 10,
    "products": [
        // {
        //     "product_name": "minion harness",
        //     "product_category": "harness",
        //     "product_price": "897",
        //     "product_stock": "78",
        //     "product_photo": "https://ecommerce123.s3.amazonaws.com/913%2BrwwAZnL._AC_UF1000%2C1000_QL80_.jpg"
        // },
        {
            "product_name": "cat",
            "product_category": "pet",
            "product_price": "76978",
            "product_stock": "76",
            "product_photo": "https://ecommerce123.s3.ap-south-1.amazonaws.com/Screenshot%202023-11-19%20134431.png"
        },
        {
            "product_name": "Coca cola",
            "product_category": "Food",
            "product_price": "23",
            "product_stock": "87",
            "product_photo": "https://ecommerce123.s3.ap-south-1.amazonaws.com/download%20%281%29.jpeg"
        },
        {
            "product_name": "Cloth clip with wire",
            "product_category": "home essentials",
            "product_price": "67",
            "product_stock": "766",
            "product_photo": "https://ecommerce123.s3.ap-south-1.amazonaws.com/download%20%282%29.jpeg"
        },
        {
            "product_name": "indoor hanger",
            "product_category": "home essentials",
            "product_price": "56",
            "product_stock": "98",
            "product_photo": "https://ecommerce123.s3.ap-south-1.amazonaws.com/download%20%283%29.jpeg"
        },
        {
            "product_name": "cloth hanger",
            "product_category": "home essentials",
            "product_price": "54",
            "product_stock": "67",
            "product_photo": "https://ecommerce123.s3.ap-south-1.amazonaws.com/download%20%284%29.jpeg"
        },
        {
            "product_name": "shoe rack",
            "product_category": "home essentials",
            "product_price": "766",
            "product_stock": "45",
            "product_photo": "https://ecommerce123.s3.ap-south-1.amazonaws.com/download%20%285%29.jpeg"
        },
        {
            "product_name": "camera",
            "product_category": "hobbies",
            "product_price": "456",
            "product_stock": "34",
            "product_photo": "https://ecommerce123.s3.ap-south-1.amazonaws.com/download.jpeg"
        },
        {
            "product_name": "cat",
            "product_category": "hobbies",
            "product_price": "56",
            "product_stock": "9",
            "product_photo": "https://ecommerce123.s3.ap-south-1.amazonaws.com/133b0ab0142b8faf0e11ad289ff0749e.jpg"
        },
        {
            "product_name": "puttu podi",
            "product_category": "food",
            "product_price": "65",
            "product_stock": "23",
            "product_photo": "https://ecommerce123.s3.ap-south-1.amazonaws.com/images%20%281%29.jpeg"
        }
    ]
}

const mockCollection = {
    find: sinon.stub().returnsThis(),
    skip: sinon.stub().returnsThis(),
    limit: sinon.stub().returnsThis(),
    sort: sinon.stub().returnsThis(),
    toArray: sinon.stub().resolves(mockProducts)
};
const mockDb = {
    collection: sinon.stub().returns(mockCollection)
};
const clientStub = {
    db: sinon.stub().returns(mockDb),
    connect: sinon.stub(),
    close: sinon.stub(),
};

let req: Partial<Request> = {
    query: {
        supplier_reg_id: '979456' as string,
    }
};

describe('getProductsSupplier', function () {
    let getProductsSpy: sinon.SinonSpy;
    let getProductsStub:sinon.SinonStub= sinon.stub().resolves(mockProducts.products);
    let jsonSpy: sinon.SinonSpy;
    let res: Partial<Response>;

    beforeEach(function () {
        getProductsSpy = sinon.spy(getProductsSupplier);
        jsonSpy = sinon.spy();
        res = {
            status: sinon.stub().returnsThis() as sinon.SinonStub,
            json: jsonSpy,
        };
    });

    afterEach(function () {
        sinon.reset();
    });

    it.skip('should return 422 if supplier registration ID is not provided', async function () {
        delete req?.query?.supplier_reg_id;
        await getProductsSpy(req as Request, res as Response);
        sinon.assert.calledWith(getProductsSpy, req, res);
        sinon.assert.calledWith(jsonSpy, { error: 'Supplier Registration ID required in the request' });
    });

    it('should return products when supplier registration ID is provided', async function () {
     
        sinon.replace(serviceGetData,'getData',getProductsStub)
        await getProductsSpy(req as Request, res as Response);
        sinon.assert.called(getProductsSpy);
        sinon.assert.calledWith(jsonSpy, { count: mockProducts.products.length, products: mockProducts.products });
    });
});
