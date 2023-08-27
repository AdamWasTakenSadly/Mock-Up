const Order = require('../models/OrdersModel');

// Controller actions

const createOrder = async (req, res) => {
  const {
    orderFirstName,
    orderLastName,
    orderPhone,
    orderProducts,
    totalAmount,
    address,
    additionalInfo,
  } = req.body;

  try {
    const orderUser = req.user.id;
    const order = await Order.create({
      orderUser,
      orderFirstName,
      orderLastName,
      orderPhone,
      orderProducts,
      totalAmount,
      address,
      additionalInfo,
    });
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// Add more controller actions as needed

module.exports = {
  createOrder,
  // Add other controller actions here
};
