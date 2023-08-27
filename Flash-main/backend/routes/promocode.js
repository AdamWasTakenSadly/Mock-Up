const express = require('express');
const router = express.Router();
const promocodeController = require('../controllers/PromocodeController');

// Routes
router.get('/promocodes', promocodeController.getAllPromocodes);
// Add more routes as needed

module.exports = router;
