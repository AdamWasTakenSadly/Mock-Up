const express = require('express');
const {
    getAllLogs,
    addLog,
    emailToDevs
  } = require("../controllers/LogController");
  const { requireAuth,requireAuth2 } = require("../Middleware/authMiddleware");
const router = express.Router();


// Routes
//GET ALL LOGS
router.get('/', requireAuth2, getAllLogs);

//POST A LOG
router.post('/', requireAuth2, addLog);

// Send email to devs for bugs
router.post('/emailToDevs', requireAuth2, emailToDevs);


module.exports = router;
