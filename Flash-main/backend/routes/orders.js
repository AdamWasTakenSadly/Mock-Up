const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController');

// Routes
router.post('/orders', OrderController.createOrder);
// Add more routes as needed

module.exports = router;
