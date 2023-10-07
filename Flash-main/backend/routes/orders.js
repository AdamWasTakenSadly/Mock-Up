const express = require("express");
const router = express.Router();

const {createOrder, getOrdersPending,
    getOrdersDelivering,
    getOrdersShipped,

    getOrdersCanceled,getUserOrders,
    updateStatus,sendOrderDetails} = require('../controllers/OrderController');

const { requireAuth, requireAuth2 } = require("../Middleware/authMiddleware");




router.post('/createOrder', requireAuth, createOrder);
router.post("/sendOrderDetails", requireAuth, sendOrderDetails);
router.get('/pending', requireAuth2, getOrdersPending);
router.get('/delivering', requireAuth2, getOrdersDelivering);
router.get('/shipped', requireAuth2, getOrdersShipped);
router.get('/canceled', requireAuth2, getOrdersCanceled);
router.patch('/status/:id', requireAuth2, updateStatus);

router.get('/getUserOrders',requireAuth, getUserOrders);


module.exports = router;
