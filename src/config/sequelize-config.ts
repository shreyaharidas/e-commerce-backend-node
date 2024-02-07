import { Sequelize } from 'sequelize';

import envConfig from "./envConfig";

const sequelize = new Sequelize({
  database: 'e_commerce',
  username: envConfig.mysql_username,
  password:envConfig.mysql_password,
  host:envConfig.mysql_host,
  port:envConfig.mysql_port,
  dialect: 'mysql',
});

export default sequelize;
