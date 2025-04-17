const Profile = require('../models/Profile');
const { generateRiskReport } = require('../utils/riskCalculator');

// Save profile data
const saveProfile = async (req, res) => {
  try {
    const { userId, profile } = req.body;

    if (!userId || !profile) {
      return res.status(400).json({ error: 'User ID and profile data are required' });
    }

    let existingProfile = await Profile.findOne({ userId });
    
    if (existingProfile) {
      // Update existing profile
      existingProfile = Object.assign(existingProfile, profile);
      await existingProfile.save();
    } else {
      // Create new profile
      existingProfile = await Profile.create({ userId, ...profile });
    }

    const riskReport = generateRiskReport(existingProfile);

    return res.status(200).json({ 
      message: 'Profile saved successfully', 
      profile: existingProfile,
      risk: riskReport
    });
  } catch (error) {
    console.error('Error saving profile:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Load profile data
const loadProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const profile = await Profile.findOne({ userId });

    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    const riskReport = generateRiskReport(profile);

    return res.status(200).json({ 
      profile, 
      risk: riskReport
    });
  } catch (error) {
    console.error('Error loading profile:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Get risk trends
const getRiskTrends = async (req, res) => {
  try {
    const { userId } = req.params;
    const { startDate, endDate } = req.query;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const profile = await Profile.findOne({ userId });
    
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    // For now, return current risk report
    // TODO: Implement historical risk tracking
    const riskReport = generateRiskReport(profile);

    return res.status(200).json({
      currentRisk: riskReport,
      trends: {
        historical: [],
        improvement: 0,
        recommendations: []
      }
    });
  } catch (error) {
    console.error('Error getting risk trends:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { saveProfile, loadProfile, getRiskTrends };