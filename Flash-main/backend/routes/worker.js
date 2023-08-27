const express = require('express');
const router = express.Router();
const workerController = require('../controllers/WorkerController');

// Routes
router.get('/workers', workerController.getAllWorkers);
// Add more routes as needed

module.exports = router;
