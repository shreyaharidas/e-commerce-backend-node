import { Sequelize } from 'sequelize';

import envConfig from "./envConfig";

const sequelize = new Sequelize({
  database: 'e_commerce',
  username: "root",
  password:"Shreya#1994",
  host:"ec2-13-200-244-243.ap-south-1.compute.amazonaws.com",
  port:3306,
  dialect: 'mysql',
});

export default sequelize;
