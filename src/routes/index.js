// routes/index.js
const express = require('express');
const router = express.Router();

// Define your main routes
router.get('/', (req, res) => {
  res.send('Welcome to the main page!');
});

// Export the router
module.exports = router;
