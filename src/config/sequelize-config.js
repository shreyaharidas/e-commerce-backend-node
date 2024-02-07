// sequelize-config.js

const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  database: 'e_commerce',
  username: 'root',
  password: '1994',
  host: '127.0.0.1',
  dialect: 'mysql',
});

module.exports = sequelize;
