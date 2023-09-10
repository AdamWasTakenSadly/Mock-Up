const express = require('express');
const router = express.Router();
const {createOrder, getOrdersPending,
    getOrdersDelivering,
    getOrdersShipped,
    getOrdersCanceled,
    updateStatus} = require('../controllers/OrderController');
const { requireAuth } = require("../Middleware/authMiddleware");


// Routes
router.post('/createOrder', requireAuth, createOrder);
router.get('/pending', getOrdersPending);
router.get('/delivering', getOrdersDelivering);
router.get('/shipped', getOrdersShipped);
router.get('/canceled', getOrdersCanceled);
router.patch('/status/:id', updateStatus);

module.exports = router;
