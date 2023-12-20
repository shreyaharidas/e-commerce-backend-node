require('dotenv').config(); // Load environment variables from .env
const express = require('express');
const app = express();
const sequelize = require('./src/config/sequelize-config');

const port = process.env.PORT || 3000; // Use the PORT variable from .env or default to 3000

const indexRoutes = require('./src/routes/index');
const supplierRoutes = require('./src/routes/supplierRoutes');


// Sync the database
sequelize.sync({ force: false }) // Set force to true to drop and recreate tables on every application start
  .then(() => {
    console.log('Database synced');
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });

// Define a simple route
// app.use('/', indexRoutes);
app.use('/api/v1', supplierRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// app.js





// Example usage in app.js

// const User = require('./models/User');

// // Create a new user
// User.create({
//   name: 'John Doe',
// })
//   .then((user) => {
//     console.log('User created:', user.toJSON());
//   })
//   .catch((error) => {
//     console.error('Error creating user:', error);
//   });

// // Fetch all users
// User.findAll()
//   .then((users) => {
//     console.log('All users:', users.map((user) => user.toJSON()));
//   })
//   .catch((error) => {
//     console.error('Error fetching users:', error);
//   });
