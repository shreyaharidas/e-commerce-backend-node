// config.ts

import { urlencoded } from "express";
import { Config } from "../../types/configTypes/index"
import envConfig from "./envConfig";
  
  const config: Config = {
    development: {
      mongoURI: `mongodb+srv://shreyaharidas15:${encodeURIComponent(
        "Sh1509@mdb"
      )}@cluster0.zahegyj.mongodb.net/?retryWrites=true&w=majority`,
      port: 3000,
      secretKey: 'your_secret_key',
    },
    production: {
      mongoURI: 'mongodb://your-production-mongo-uri',
      port: 8080,
      secretKey: 'your_production_secret_key',
    },
  };
  
  export default config;
  