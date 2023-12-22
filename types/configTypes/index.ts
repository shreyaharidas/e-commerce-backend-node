interface DatabaseConfig {
    host: string;
    user: string;
    password: string;
    database: string;
    connectionLimit: number;
    port: number;
    insecureAuth?: boolean;
  }
  
  interface ServerConfig {
    port: number;
  }
  
 export interface AppConfig {
    database: DatabaseConfig;
    server: ServerConfig;
  }

 export type Config = {
  [key:string]: {
    mongoURI: string;
    port: number;
    secretKey: string;
  };
};