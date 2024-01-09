import sequelize from "../config/sequelize-config";
import {Sequelize} from "sequelize"

const sequelizeSync=async():Promise<void>=>{
    await sequelize
    .authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch((err: Error) => {
      console.error('Unable to connect to the database:', err);
    });

    await sequelize.sync({ force: false }) // Set force to true to drop and recreate tables on every application start
  .then(() => {
    console.log('Database synced');
  })
  .catch((error: Error) => {
    console.error('Error syncing database:', error);
  });

}

export {sequelizeSync}