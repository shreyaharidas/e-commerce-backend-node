// config.js

const config = {
    database: {
      host: '127.0.0.1',
      user: 'root',
      password: '1994',
      database: 'e_commerce',
      connectionLimit: 10, // Adjust as needed
      port:3306,
      insecureAuth: true,
    },
    server: {
      port: 3000, // Your Node.js application's port
    },
  };
  
  module.exports = config;
  

//   CREATE DATABASE `e_commerce`;
// GRANT ALL PRIVILEGES ON `e_commerce`.* TO 'your_user'@'localhost';
// FLUSH PRIVILEGES;
