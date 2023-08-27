const Worker = require('../models/WorkerModel');

// Controller actions
const getAllWorkers = async (req, res) => {
  try {
    const workers = await Worker.find();
    res.json(workers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add more controller actions as needed

module.exports = {
  getAllWorkers,
  // Add other controller actions here
};
