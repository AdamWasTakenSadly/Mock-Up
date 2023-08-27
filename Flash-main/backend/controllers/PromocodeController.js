const Promocode = require('../models/PromocodeModel');

// Controller actions
const getAllPromocodes = async (req, res) => {
  try {
    const promocodes = await Promocode.find();
    res.json(promocodes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add more controller actions as needed

module.exports = {
  getAllPromocodes,
  // Add other controller actions here
};
