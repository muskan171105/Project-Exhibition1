const express = require('express');
const router = express.Router();
const { fetchHealthData } = require('../controllers/recordController'); // Import controller

// Route to fetch health data for user_id 1711
router.get('/records', fetchHealthData);

module.exports = router;
