// Risk score calculation utilities
const calculateBaseRisk = (age) => {
  if (age < 30) return 0;
  if (age < 40) return 5;
  if (age < 50) return 10;
  if (age < 60) return 15;
  return 20;
};

const calculateLifestyleRisk = (profile) => {
  let risk = 0;

  // Physical activity risk
  const activityRisk = {
    'Very active (daily workouts, walking etc.)': 0,
    'Moderately active (occasional walks, active job)': 5,
    'Mostly sedentary (desk job, no exercise)': 10
  };
  risk += activityRisk[profile.physicalActivity] || 0;

  // Smoking risk
  const smokingRisk = {
    'Yes, currently': 20,
    'I used to but quit': 10,
    'No, never': 0
  };
  risk += smokingRisk[profile.smoking] || 0;

  // Alcohol consumption risk
  const alcoholRisk = {
    'Frequently (more than 3 times a week)': 15,
    'Occasionally (1–2 times a week)': 5,
    'Rarely / Never': 0
  };
  risk += alcoholRisk[profile.alcohol] || 0;

  return risk;
};

const calculateHealthConditionRisk = (profile) => {
  let risk = 0;

  // Family history risk
  if (profile.familyHistory === 'Yes') risk += 15;

  // Blood pressure risk
  if (profile.bloodPressure === 'Yes') risk += 20;

  // Diabetes risk
  if (profile.diabetes === 'Yes') risk += 20;

  return risk;
};

const calculateMentalHealthRisk = (profile) => {
  let risk = 0;

  // Stress level risk
  const stressRisk = {
    'Yes, very often': 10,
    'Sometimes': 5,
    'Rarely / No': 0
  };
  risk += stressRisk[profile.stress] || 0;

  // Sleep pattern risk
  const sleepRisk = {
    'Less than 5 hrs': 10,
    '5–6 hrs': 5,
    '7–8 hrs (ideal)': 0,
    'More than 9 hrs': 5
  };
  risk += sleepRisk[profile.sleep] || 0;

  return risk;
};

const calculateTotalRiskScore = (profile) => {
  if (!profile) return 0;

  let totalRisk = 0;

  // Add base risk from age
  totalRisk += calculateBaseRisk(profile.age);

  // Add lifestyle risks
  totalRisk += calculateLifestyleRisk(profile);

  // Add health condition risks
  totalRisk += calculateHealthConditionRisk(profile);

  // Add mental health risks
  totalRisk += calculateMentalHealthRisk(profile);

  // Cap the maximum risk at 100
  return Math.min(totalRisk, 100);
};

const getRiskCategory = (score) => {
  if (score <= 20) return 'Low Risk';
  if (score <= 50) return 'Moderate Risk';
  return 'High Risk';
};

const generateRiskReport = (profile) => {
  const score = calculateTotalRiskScore(profile);
  const category = getRiskCategory(score);

  return {
    score,
    category,
    details: {
      baseRisk: calculateBaseRisk(profile.age),
      lifestyleRisk: calculateLifestyleRisk(profile),
      healthConditionRisk: calculateHealthConditionRisk(profile),
      mentalHealthRisk: calculateMentalHealthRisk(profile)
    }
  };
};

module.exports = {
  calculateTotalRiskScore,
  getRiskCategory,
  generateRiskReport
};