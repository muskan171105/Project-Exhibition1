const express = require('express');
const { processHealthData } = require('../controllers/healthController'); // Import the controller

const router = express.Router();

// Define the POST route to process health data
router.post('/processHealthData', processHealthData);

module.exports = router;
