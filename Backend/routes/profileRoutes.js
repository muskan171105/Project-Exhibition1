const express = require('express');
const router = express.Router();
const { saveProfile } = require('../controllers/profileController');

// Route to handle profile form submission without photo
router.post('/profile', saveProfile);

module.exports = router;
