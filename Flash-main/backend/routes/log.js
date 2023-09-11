const express = require('express');
const {
    getAllLogs,
    addLog
  } = require("../controllers/LogController");
const router = express.Router();


// Routes
//GET ALL LOGS
router.get('/', getAllLogs);

//POST A LOG
router.post('/', addLog);


module.exports = router;
