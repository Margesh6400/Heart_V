// Mock database (replace with actual database logic)
const mockDatabase = {};

// Calculate risk score based on profile data
const calculateRiskScore = (profile) => {
  let score = 0;

  if (profile.age && profile.age > 50) score += 20;
  if (profile.familyHistory === 'Yes') score += 20;
  if (profile.bloodPressure === 'Yes') score += 20;
  if (profile.diabetes === 'Yes') score += 20;
  if (profile.physicalActivity === 'Mostly sedentary') score += 10;
  if (profile.stress === 'Yes, very often') score += 10;
  if (profile.smoking === 'Yes, currently') score += 10;
  if (profile.alcohol === 'Frequently (more than 3 times a week)') score += 10;

  return Math.min(score, 100); // Cap the score at 100
};

// Save profile data
const saveProfile = (req, res) => {
  const { userId, profile } = req.body;

  if (!userId || !profile) {
    return res.status(400).json({ error: 'User ID and profile data are required' });
  }

  mockDatabase[userId] = profile;
  const riskScore = calculateRiskScore(profile);

  return res.status(200).json({ message: 'Profile saved successfully', riskScore });
};

// Load profile data
const loadProfile = (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  const profile = mockDatabase[userId];

  if (!profile) {
    return res.status(404).json({ error: 'Profile not found' });
  }

  const riskScore = calculateRiskScore(profile);

  return res.status(200).json({ profile, riskScore });
};

module.exports = { saveProfile, loadProfile };