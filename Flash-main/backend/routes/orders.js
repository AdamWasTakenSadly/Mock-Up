const express = require('express');
const router = express.Router();
const {createOrder} = require('../controllers/OrderController');
const { requireAuth } = require("../Middleware/authMiddleware");


// Routes
router.post('/createOrder', requireAuth, createOrder);
// Add more routes as needed

module.exports = router;
