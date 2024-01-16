import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  database: 'e_commerce',
  username: 'root',
  // password: 'Shreya#1994',
  // host: 'ec2-3-109-50-69.ap-south-1.compute.amazonaws.com',
  password:"1994",
  host:"localhost",
  port:3306,
  dialect: 'mysql',
});

export default sequelize;
