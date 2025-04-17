const express = require('express');
const { saveProfile, loadProfile } = require('../controllers/profileController');

const router = express.Router();

// Route to save profile data
router.post('/profile', saveProfile);

// Route to load profile data
router.get('/profile/:userId', loadProfile);

module.exports = router;