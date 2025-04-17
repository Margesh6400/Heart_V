const express = require('express');
const { saveProfile, loadProfile, getRiskTrends } = require('../controllers/profileController');
const validateProfile = require('../middlewares/validateProfile');

const router = express.Router();

// Save profile data with validation middleware
router.post('/profile', validateProfile, saveProfile);

// Load profile data
router.get('/profile/:userId', loadProfile);

// Get risk trends
router.get('/profile/:userId/trends', getRiskTrends);

module.exports = router;