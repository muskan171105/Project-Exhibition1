const express = require('express');
const { startDetection } = require('../controllers/detectionController');

const router = express.Router();

router.post('/start-detection', startDetection);

module.exports = router;
