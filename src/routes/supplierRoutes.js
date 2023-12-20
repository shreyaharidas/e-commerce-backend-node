// routes/userRoutes.js
const express = require('express');
const router = express.Router();

// Define your supplier-related routes
router.get('/suppliers', (req, res) => {
  res.send('List of suppliers');
});

router.get('/suppliers/:id', (req, res) => {
  res.send(`Supplier profile for ID ${req.params.id}`);
});

// Export the router
module.exports = router;
