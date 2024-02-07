import * as dotenv from "dotenv";
import { EnvConfig } from "../../types/configTypes";

dotenv.config({ path: `environments/.env` });
const env = process.env.NODE_ENV || "development";
dotenv.config({ path: `environments/.env.${env}` });

const envConfig: EnvConfig = {
  port: Number(process.env.PORT),
  socket: Number(process.env.SOCKET),
  mongodb_connection_string:
    process.env.MONGODB_CONNECTION_STRING ??
    `mongodb+srv://shreyaharidas15:${encodeURIComponent(
      "Sh1509@mdb"
    )}@cluster0.zahegyj.mongodb.net/?retryWrites=true&w=majority`,
  mysql_host: process.env.MYSQL_HOST ?? "localhost",
  mysql_password: process.env.MYSQL_PASSWORD ?? "1994",
  mysql_username: process.env.MYSQL_USER_NAME ?? "root",
  mysql_port: Number(process.env.MYSQL_PORT) ?? 3306,
  jwt_secret_key: process.env.JWT_SECRET_KEY ?? "your-secret-key-dev",
  s3_secret_key:
    process.env.S3_SECRET_KEY ?? "CXzdDqXfWFoEINOvIDs9YkDkFG/IMcFNaxFsqLL0",
  s3_access_key: process.env.S3_ACCESS_KEY ?? "AKIAW3MEC2CXQZDAUQVW",
  stripe_secret_key:
    process.env.STRIPE_SECRET_KEY ??
    "sk_test_51ORUlBSHq5EqE6NlIIjtrUNg8XYq8VrbZuIYgHEInSPs2qbOiZv1fhWLbLiUX6ykWfuY2Y3KWlVbhtUACEYRk3oO003KVzBoKC",
  cors_origin: process.env.CORS_ORIGIN ?? "http://localhost:8080",
};

export default envConfig;
