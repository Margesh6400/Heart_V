// pages/DailyReport.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';

const HEALTH_TIPS = {
  water: {
    low: "Dil ko thoda aur pyar chahiye — try to drink 8+ glasses tomorrow 💧",
    medium: "Good hydration = happy circulation! Keep sipping water like a heart hero 🚰❤️",
    poor: "Only 4 glasses today? Chal na, kal se pani ki bottle dost banale 💦"
  },
  exercise: {
    none: "Even 15 mins of walking tomorrow will make your heart say 'Thank you!' 👟",
    light: "Body ko stretch karo, stress ko out karo! Yoga tomorrow? 🧘‍♀️",
    moderate: "Keep moving! Your heart loves this rhythm 🎵"
  },
  eating: {
    healthy: "Ghar ka khana = dil ka superpower! Keep it up! 🍛💖",
    unhealthy: "Too much oil today — kal try light oil or steam veggies! 🫕🛢️",
    moderate: "One junk meal won't break you — just balance it tomorrow with fruit & fiber 🍎"
  },
  smoke: {
    no: "No cigs today? Dil se salute! 💪 Each smoke-free day is a level-up!",
    yes: "Smoked today? It's okay. Try to skip the next one. Small wins, big change 🚭",
    sometimes: "Be a heart hero, not a smoke show! Your lungs will thank you 🫁"
  },
  mood: {
    happy: "Happy mood detected 😄 — your heart's dancing right now! Keep the vibes flowing!",
    stressed: "Stressed today? Take 10 mins tomorrow just for yourself. Breathe 💨🧠",
    neutral: "Feeling balanced is good! Each day is a new chance to smile 😊"
  }
};

const POSITIVE_REINFORCEMENTS = [
  "You're doing better than you think. Small steps make big change 🌱",
  "Each healthy choice is a love letter to your heart 💌💓",
  "Consistency beats perfection — just show up for yourself tomorrow!",
  "Your heart thanks you for every mindful choice 💝",
  "Keep going! Your future self will thank you 🌟"
];

// Progress Circle Component
const ProgressCircle = ({ percentage, color }) => (
  <div className="relative w-32 h-32">
    <svg className="w-full h-full" viewBox="0 0 100 100">
      <circle
        className="text-gray-200 stroke-current"
        strokeWidth="10"
        fill="transparent"
        r="40"
        cx="50"
        cy="50"
      />
      <motion.circle
        className={`stroke-current ${color}`}
        strokeWidth="10"
        fill="transparent"
        r="40"
        cx="50"
        cy="50"
        strokeDasharray={`${percentage * 2.51327} 251.327`}
        strokeLinecap="round"
        transform="rotate(-90 50 50)"
        initial={{ strokeDasharray: "0 251.327" }}
        animate={{ strokeDasharray: `${percentage * 2.51327} 251.327` }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
      <text
        x="50"
        y="50"
        className="text-2xl font-bold"
        dominantBaseline="middle"
        textAnchor="middle"
        fill="currentColor"
      >
        {percentage}%
      </text>
    </svg>
  </div>
);

const calculateRiskScore = (formData) => {
  let risk = 0;
  if (formData.smoke === 'yes') risk += 20;
  if (formData.eating === 'unhealthy') risk += 15;
  if (formData.exercise === 'none') risk += 10;
  if (formData.water === 'veryLow') risk += 10;
  if (formData.sleep === 'poor') risk += 15;
  return Math.min(risk, 100);
};

const calculateDetailedRiskScore = (formData) => {
  const risks = {
    lifestyle: {
      score: 0,
      factors: []
    },
    diet: {
      score: 0,
      factors: []
    },
    activity: {
      score: 0,
      factors: []
    },
    mental: {
      score: 0,
      factors: []
    }
  };

  // Lifestyle risks
  if (formData.smoke === 'yes') {
    risks.lifestyle.score += 20;
    risks.lifestyle.factors.push('Smoking increases heart disease risk significantly');
  }
  if (formData.alcohol === 'yes') {
    risks.lifestyle.score += 15;
    risks.lifestyle.factors.push('Regular alcohol consumption affects heart health');
  }

  // Diet risks
  if (formData.eating === 'unhealthy') {
    risks.diet.score += 15;
    risks.diet.factors.push('Unhealthy eating patterns detected');
  }
  if (formData.water === 'veryLow') {
    risks.diet.score += 10;
    risks.diet.factors.push('Low water intake affects circulation');
  }

  // Activity risks
  if (formData.exercise === 'none') {
    risks.activity.score += 15;
    risks.activity.factors.push('Lack of physical activity');
  }
  if (formData.sitting === 'more4') {
    risks.activity.score += 10;
    risks.activity.factors.push('Extended sitting periods');
  }

  // Mental health risks
  if (formData.sleep === 'poor') {
    risks.mental.score += 15;
    risks.mental.factors.push('Poor sleep quality affects heart recovery');
  }
  if (formData.mood === 'stressed') {
    risks.mental.score += 10;
    risks.mental.factors.push('High stress levels detected');
  }

  return risks;
};

const generatePersonalizedGoals = (formData, risks) => {
  const goals = [];
  
  // Add goals based on risk factors
  if (risks.lifestyle.score > 15) {
    goals.push({
      category: 'lifestyle',
      icon: '🚭',
      title: 'Lifestyle Changes',
      tasks: [
        { id: 'quit_smoking', text: 'Try to reduce smoking by 1 cigarette tomorrow', checked: false },
        { id: 'alcohol_reduction', text: 'Skip alcohol for the next 24 hours', checked: false }
      ]
    });
  }

  if (risks.diet.score > 10) {
    goals.push({
      category: 'diet',
      icon: '🥗',
      title: 'Diet Improvements',
      tasks: [
        { id: 'water_intake', text: 'Drink 8 glasses of water tomorrow', checked: false },
        { id: 'healthy_meal', text: 'Plan one healthy, home-cooked meal', checked: false }
      ]
    });
  }

  if (risks.activity.score > 10) {
    goals.push({
      category: 'activity',
      icon: '🏃',
      title: 'Activity Goals',
      tasks: [
        { id: 'morning_walk', text: 'Take a 15-minute morning walk', checked: false },
        { id: 'stretch_breaks', text: 'Take 3 stretch breaks during work', checked: false }
      ]
    });
  }

  if (risks.mental.score > 10) {
    goals.push({
      category: 'mental',
      icon: '🧘',
      title: 'Mental Wellness',
      tasks: [
        { id: 'meditation', text: 'Do 5 minutes of deep breathing', checked: false },
        { id: 'sleep_routine', text: 'Start bedtime routine 30 minutes earlier', checked: false }
      ]
    });
  }

  return goals;
};

const getHealthStatus = (risk) => {
  if (risk < 30) return { type: 'green', message: '🎉 Your heart is dancing today!' };
  if (risk < 60) return { type: 'yellow', message: '🌟 Not bad, but let\'s give more love to the heart tomorrow!' };
  return { type: 'red', message: '❗ Today was rough, but tomorrow is a fresh chance!' };
};

const getTips = (formData) => {
  const tips = [];
  
  // Add category-specific tips
  if (formData.water) {
    tips.push(HEALTH_TIPS.water[formData.water === 'veryLow' ? 'poor' : formData.water === 'moderate' ? 'medium' : 'low']);
  }
  
  if (formData.exercise) {
    tips.push(HEALTH_TIPS.exercise[formData.exercise === 'none' ? 'none' : formData.exercise === 'light' ? 'light' : 'moderate']);
  }
  
  if (formData.eating) {
    tips.push(HEALTH_TIPS.eating[formData.eating]);
  }
  
  if (formData.smoke) {
    tips.push(HEALTH_TIPS.smoke[formData.smoke === 'no' ? 'no' : formData.smoke === 'yes' ? 'yes' : 'sometimes']);
  }
  
  if (formData.mood) {
    tips.push(HEALTH_TIPS.mood[formData.mood]);
  }
  
  // Add a random positive reinforcement
  tips.push(POSITIVE_REINFORCEMENTS[Math.floor(Math.random() * POSITIVE_REINFORCEMENTS.length)]);
  
  return tips.slice(0, 4); // Return up to 4 tips
};

const getHealthMetricColor = (value) => {
  switch (value) {
    case 'yes':
    case 'unhealthy':
    case 'none':
    case 'veryLow':
    case 'poor':
      return 'text-red-500';
    case 'sometimes':
    case 'moderate':
    case 'low':
    case 'fair':
      return 'text-yellow-500';
    default:
      return 'text-green-500';
  }
};

const MetricCard = ({ label, value, icon }) => (
  <motion.div
    className="p-4 transition-shadow bg-white rounded-lg shadow-sm hover:shadow-md"
    initial={{ scale: 0.95, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    transition={{ duration: 0.3 }}
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-xl">{icon}</span>
        <span className="capitalize text-slate-600">{label}</span>
      </div>
      <span className={`font-semibold ${getHealthMetricColor(value)} transition-colors`}>
        {value}
      </span>
    </div>
  </motion.div>
);

const Section = ({ title, children }) => (
  <motion.div
    className="p-6 mb-6 shadow-lg bg-white/70 backdrop-blur-md rounded-2xl"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <h3 className="mb-4 text-xl font-semibold text-slate-700">{title}</h3>
    {children}
  </motion.div>
);

const RiskFactorCard = ({ title, score, factors, icon, color }) => (
  <motion.div
    className={`p-4 rounded-lg ${color}`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.02 }}
  >
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        <span className="text-2xl">{icon}</span>
        <h3 className="font-semibold text-slate-800">{title}</h3>
      </div>
      <span className={`px-2 py-1 text-sm font-medium rounded-full ${
        score > 15 ? 'bg-red-100 text-red-700' :
        score > 10 ? 'bg-yellow-100 text-yellow-700' :
        'bg-green-100 text-green-700'
      }`}>
        {score}%
      </span>
    </div>
    <ul className="space-y-2">
      {factors.map((factor, index) => (
        <li key={index} className="text-sm text-slate-600">
          • {factor}
        </li>
      ))}
    </ul>
  </motion.div>
);

const DailyReport = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const formData = state?.formData || {};
  const [showGoals, setShowGoals] = useState(false);
  const [selectedTip, setSelectedTip] = useState(null);
  const [activeGoals, setActiveGoals] = useState([]);
  const [showDetailedRisk, setShowDetailedRisk] = useState(false);
  
  const riskScore = calculateRiskScore(formData);
  const healthStatus = getHealthStatus(riskScore);
  const tips = getTips(formData);
  const detailedRisks = calculateDetailedRiskScore(formData);
  const goals = generatePersonalizedGoals(formData, detailedRisks);

  const metricIcons = {
    water: '💧',
    exercise: '🏃',
    eating: '🍱',
    smoke: '🚭',
    mood: '😊',
    sleep: '😴',
    alcohol: '🍷',
    sitting: '🪑'
  };

  const handleGoalToggle = (goalId) => {
    setActiveGoals(prev => 
      prev.includes(goalId) 
        ? prev.filter(id => id !== goalId)
        : [...prev, goalId]
    );
  };

  return (
    <motion.div
      className="min-h-screen p-8 bg-gradient-to-br from-slate-50 to-slate-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-5xl mx-auto">
        <motion.div 
          className="mb-8 text-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold text-transparent bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text">
            Daily Report
          </h2>
          <p className="mt-2 text-slate-600">Here's your wellness summary</p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          <Section title="Today's Summary">
            <div className="grid gap-3 md:grid-cols-2">
              {Object.entries(formData).map(([key, value], index) => (
                <motion.div
                  key={key}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <MetricCard 
                    label={key} 
                    value={value} 
                    icon={metricIcons[key] || '❤️'}
                  />
                </motion.div>
              ))}
            </div>
          </Section>

          <Section title="Detailed Risk Assessment">
            <div className="space-y-4">
              <div className="flex flex-col items-center justify-center mb-6">
                <ProgressCircle
                  percentage={riskScore}
                  color={
                    healthStatus.type === 'green'
                      ? 'text-green-500'
                      : healthStatus.type === 'yellow'
                      ? 'text-yellow-500'
                      : 'text-red-500'
                  }
                />
                <motion.p
                  className="mt-4 text-center text-slate-600"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  {healthStatus.message}
                </motion.p>
                <motion.button
                  onClick={() => setShowDetailedRisk(!showDetailedRisk)}
                  className="px-4 py-2 mt-4 text-sm font-medium rounded-lg text-slate-700 bg-slate-100 hover:bg-slate-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {showDetailedRisk ? 'Hide Details' : 'Show Detailed Breakdown'}
                </motion.button>
              </div>

              <AnimatePresence>
                {showDetailedRisk && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4"
                  >
                    <RiskFactorCard
                      title="Lifestyle Factors"
                      score={detailedRisks.lifestyle.score}
                      factors={detailedRisks.lifestyle.factors}
                      icon="🎯"
                      color="bg-rose-50"
                    />
                    <RiskFactorCard
                      title="Dietary Habits"
                      score={detailedRisks.diet.score}
                      factors={detailedRisks.diet.factors}
                      icon="🍎"
                      color="bg-green-50"
                    />
                    <RiskFactorCard
                      title="Physical Activity"
                      score={detailedRisks.activity.score}
                      factors={detailedRisks.activity.factors}
                      icon="⚡"
                      color="bg-blue-50"
                    />
                    <RiskFactorCard
                      title="Mental Wellness"
                      score={detailedRisks.mental.score}
                      factors={detailedRisks.mental.factors}
                      icon="🧠"
                      color="bg-purple-50"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Section>

          <Section title="Tomorrow's Goals">
            <div className="space-y-4">
              {goals.map((goalGroup) => (
                <motion.div
                  key={goalGroup.category}
                  className="p-4 bg-white rounded-lg shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">{goalGroup.icon}</span>
                    <h3 className="font-semibold text-slate-800">{goalGroup.title}</h3>
                  </div>
                  <div className="space-y-2">
                    {goalGroup.tasks.map((task) => (
                      <motion.div
                        key={task.id}
                        className="flex items-start gap-3"
                        whileHover={{ x: 2 }}
                      >
                        <input
                          type="checkbox"
                          id={task.id}
                          checked={activeGoals.includes(task.id)}
                          onChange={() => handleGoalToggle(task.id)}
                          className="w-4 h-4 mt-1 rounded text-rose-500 focus:ring-rose-500"
                        />
                        <label htmlFor={task.id} className="text-sm text-slate-600">
                          {task.text}
                        </label>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}

              {activeGoals.length > 0 && (
                <motion.div
                  className="p-4 mt-4 rounded-lg bg-rose-50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <p className="text-sm font-medium text-rose-700">
                    🎯 You've set {activeGoals.length} goals for tomorrow! Stay committed to your heart health journey.
                  </p>
                </motion.div>
              )}
            </div>
          </Section>

          <Section title="Personalized Tips">
            <div className="space-y-3">
              {tips.map((tip, index) => (
                <motion.div
                  key={index}
                  className={`p-4 rounded-lg transition-colors ${
                    selectedTip === index ? 'bg-slate-100' : 'bg-slate-50'
                  } cursor-pointer`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  transition={{ delay: index * 0.2 }}
                  onClick={() => setSelectedTip(index === selectedTip ? null : index)}
                >
                  <motion.p
                    initial={{ opacity: 0.8 }}
                    animate={{ opacity: 1 }}
                    className="text-slate-700"
                  >
                    {tip}
                  </motion.p>
                </motion.div>
              ))}
            </div>
          </Section>
        </div>

        <div className="flex gap-4 mt-8">
          <motion.button
            onClick={() => navigate('/')}
            className="px-6 py-3 text-white rounded-xl bg-slate-800"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Back to Check-In
          </motion.button>
          <motion.button
            onClick={() => navigate('/weekly-report')}
            className="px-6 py-3 bg-white text-slate-800 rounded-xl"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            View Weekly Report
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default DailyReport;
