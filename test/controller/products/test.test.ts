
// import sinon, { SinonSpy } from "sinon";
// import { getProductsSupplier } from "../../../src/controllers/products/getProductsSupplier";
// import {Request, Response} from "express"
// import { json } from "sequelize";

// let req:Partial<Request>={
//     query:{
// supplier_reg_id:"979456",
//     }
// }

// let jsonSpy=sinon.spy()

// let res:Partial<Response>={
//     status:sinon.stub().returnsThis(),
//     json:jsonSpy,
// }

// describe("testing getProductsSupplier",async()=>{

// let getProductsSpy:SinonSpy;

// beforeEach(()=>{
//     getProductsSpy=sinon.spy(getProductsSupplier)
// })

// afterEach(()=>{
//     sinon.reset();
// })

// it("testing for 422",async()=>{
//     delete req.query.supplier_reg_id;
//     await getProductsSpy(req,res)
//     sinon.assert.called(getProductsSpy);
//     sinon.assert.calledWith(jsonSpy,{ error: 'Supplier Registration ID required in the request' })
// })
// })



