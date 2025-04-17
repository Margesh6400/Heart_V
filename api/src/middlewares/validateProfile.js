const validateProfile = (req, res, next) => {
  const { userId, profile } = req.body;

  // Validate userId
  if (!userId || typeof userId !== 'string') {
    return res.status(400).json({
      error: 'Invalid user ID format'
    });
  }

  // Required profile fields
  const requiredFields = [
    'gender',
    'age',
    'familyHistory',
    'bloodPressure',
    'diabetes',
    'physicalActivity',
    'stress',
    'smoking',
    'alcohol'
  ];

  // Check for required fields
  const missingFields = requiredFields.filter(field => !profile || !profile[field]);
  if (missingFields.length > 0) {
    return res.status(400).json({
      error: `Missing required fields: ${missingFields.join(', ')}`
    });
  }

  // Validate age
  if (profile.age && (isNaN(profile.age) || profile.age < 18 || profile.age > 120)) {
    return res.status(400).json({
      error: 'Age must be between 18 and 120'
    });
  }

  next();
};

module.exports = validateProfile;