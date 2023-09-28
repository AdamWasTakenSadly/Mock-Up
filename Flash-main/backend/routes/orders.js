const express = require("express");
const router = express.Router();
const {
  createOrder,
  sendOrderDetails,
} = require("../controllers/OrderController");
const { requireAuth } = require("../Middleware/authMiddleware");

// Routes
router.post("/createOrder", requireAuth, createOrder);
router.post("/sendOrderDetails", requireAuth, sendOrderDetails);
// Add more routes as needed

module.exports = router;
