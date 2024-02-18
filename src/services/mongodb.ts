import { MongoClient, ServerApiVersion, Db,  Sort } from 'mongodb';
import config from "../config/mongodb-config.ts";


const environment= process.env.NODE_ENV || "development"

const client = new MongoClient(config[environment].mongoURI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
},);

const connectToMongoDb=async(): Promise<void>=> {
  try {

    await client.connect();  
    const db: Db = client.db("e-commerce");   
    await db.command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } 
  catch(err){
    console.log("mongodb error is ",err);
  }
}

const stopMongoDb=async(): Promise<void>=>{
   try{ await client.close();
   }
   catch(err){
    console.log("mongodb close err is ", err);
   }
}

export {connectToMongoDb, stopMongoDb, client, Db, Sort};
