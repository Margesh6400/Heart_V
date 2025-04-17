// Profile.jsx
import React, { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Save, Edit2, AlertTriangle, Shield, Activity, Coffee } from 'lucide-react';
import { fetchProfile, saveProfile } from '../services/api';
import { useNavigate } from 'react-router-dom';

const questions = {
  basic: [
    {
      id: 'gender',
      icon: '👩‍⚕️',
      question: "What's your gender?",
      type: 'select',
      options: ['Male', 'Female', 'Other / Prefer not to say']
    },
    {
      id: 'age',
      icon: '🎂',
      question: "What's your age?",
      type: 'number',
      min: 18,
      max: 120
    },
    {
      id: 'familyHistory',
      icon: '🏠',
      question: "Does anyone in your family (parents or grandparents) have heart problems or diabetes?",
      type: 'select',
      options: ['Yes', 'No', 'Not sure']
    },
    {
      id: 'bloodPressure',
      icon: '💓',
      question: "Do you have a blood pressure (BP) problem?",
      type: 'select',
      options: ['Yes', 'No', "I don't know"]
    },
    {
      id: 'diabetes',
      icon: '🩸',
      question: "Do you have diabetes?",
      type: 'select',
      options: ['Yes', 'No', "I don't know"]
    }
  ],
  lifestyle: [
    {
      id: 'physicalActivity',
      icon: '🚶',
      question: "How physically active are you in general?",
      type: 'select',
      options: [
        'Very active (daily workouts, walking etc.)',
        'Moderately active (occasional walks, active job)',
        'Mostly sedentary (desk job, no exercise)'
      ]
    },
    {
      id: 'stress',
      icon: '🧠',
      question: "Do you often feel stressed in daily life?",
      type: 'select',
      options: ['Yes, very often', 'Sometimes', 'Rarely / No']
    },
    {
      id: 'smoking',
      icon: '🚭',
      question: "Do you smoke or have smoked in the past?",
      type: 'select',
      options: ['Yes, currently', 'I used to but quit', 'No, never']
    },
    {
      id: 'alcohol',
      icon: '🍷',
      question: "Do you drink alcohol?",
      type: 'select',
      options: [
        'Frequently (more than 3 times a week)',
        'Occasionally (1–2 times a week)',
        'Rarely / Never'
      ]
    }
  ],
  habits: [
    {
      id: 'sleep',
      icon: '🛌',
      question: "How many hours of sleep do you usually get?",
      type: 'select',
      options: [
        'Less than 5 hrs',
        '5–6 hrs',
        '7–8 hrs (ideal)',
        'More than 9 hrs'
      ]
    },
    {
      id: 'screenTime',
      icon: '📱',
      question: "How much screen time do you get daily (outside of work)?",
      type: 'select',
      options: [
        'Less than 2 hours',
        '2–4 hours',
        '4+ hours'
      ]
    }
  ]
};

const Section = ({ title, children, icon }) => (
  <motion.div
    className="mb-8 overflow-hidden"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
  >
    <div className="relative p-6 bg-white shadow-sm rounded-xl">
      <div className="absolute top-0 right-0 w-32 h-32 rounded-bl-full opacity-50 bg-gradient-to-br from-slate-50 to-transparent" />
      <div className="relative flex items-center mb-6">
        <div className="flex items-center justify-center w-12 h-12 mr-4 text-2xl bg-gradient-to-br from-rose-50 to-slate-50 rounded-xl">
          {icon}
        </div>
        <h2 className="text-xl font-semibold text-transparent bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text">
          {title}
        </h2>
      </div>
      <div className="relative space-y-6">
        {children}
      </div>
    </div>
  </motion.div>
);

const QuestionCard = ({ question, value, onChange, isEditing }) => {
  const [isFocused, setIsFocused] = useState(false);
  
  return (
    <motion.div
      className={`p-6 rounded-xl transition-all ${
        isFocused 
          ? 'bg-white shadow-lg ring-2 ring-rose-100' 
          : 'bg-slate-50 hover:bg-white hover:shadow-md'
      }`}
      whileHover={{ scale: 1.01 }}
      animate={{ scale: isFocused ? 1.02 : 1 }}
    >
      <div className="flex items-start gap-4">
        <motion.div 
          className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-rose-100 to-slate-100"
          whileHover={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-xl">{question.icon}</span>
        </motion.div>
        <div className="flex-1">
          <p className="mb-3 font-medium text-slate-800">{question.question}</p>
          {question.type === 'select' ? (
            <div className="relative">
              <select
                value={value || ''}
                onChange={(e) => onChange(question.id, e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                disabled={!isEditing}
                className={`w-full p-3 pr-10 border-2 rounded-lg transition-all ${
                  isEditing 
                    ? 'bg-white hover:border-rose-200 focus:border-rose-300 focus:ring-2 focus:ring-rose-100' 
                    : 'bg-slate-50 border-slate-100 text-slate-600 cursor-not-allowed'
                }`}
              >
                <option value="">Select an answer</option>
                {question.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          ) : (
            <input
              type={question.type}
              value={value || ''}
              onChange={(e) => onChange(question.id, e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              disabled={!isEditing}
              min={question.min}
              max={question.max}
              className={`w-full p-3 border-2 rounded-lg transition-all ${
                isEditing 
                  ? 'bg-white hover:border-rose-200 focus:border-rose-300 focus:ring-2 focus:ring-rose-100' 
                  : 'bg-slate-50 border-slate-100 text-slate-600 cursor-not-allowed'
              }`}
            />
          )}
        </div>
      </div>
    </motion.div>
  );
};

const RiskIndicator = ({ score, category }) => {
  const getColor = () => {
    if (score <= 30) return 'emerald';
    if (score <= 60) return 'yellow';
    return 'rose';
  };
  
  const color = getColor();
  
  return (
    <div className={`p-6 bg-${color}-50 rounded-xl border border-${color}-100`}>
      <div className="flex items-center gap-4 mb-4">
        {score <= 30 ? (
          <Shield className={`w-8 h-8 text-${color}-500`} />
        ) : score <= 60 ? (
          <AlertTriangle className={`w-8 h-8 text-${color}-500`} />
        ) : (
          <Activity className={`w-8 h-8 text-${color}-500`} />
        )}
        <div>
          <h3 className={`text-lg font-semibold text-${color}-700`}>
            {score <= 30 ? 'Low Risk' : score <= 60 ? 'Moderate Risk' : 'High Risk'}
          </h3>
          <p className={`text-${color}-600`}>Category: {category}</p>
        </div>
      </div>
      <div className="relative pt-2">
        <div className="flex items-center justify-between mb-2">
          <div>
            <span className={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-${color}-600 bg-${color}-200`}>
              Risk Score
            </span>
          </div>
          <div className={`text-right text-${color}-600`}>
            <span className="text-xl font-bold">{score}%</span>
          </div>
        </div>
        <div className="flex h-2 mb-4 overflow-hidden text-xs rounded-full bg-slate-200">
          <motion.div
            style={{ width: `${score}%` }}
            className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-${color}-500`}
            initial={{ width: '0%' }}
            animate={{ width: `${score}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
      </div>
    </div>
  );
};

const RiskDetailsCard = ({ details }) => {
  const categories = {
    baseRisk: { label: 'Age-based Risk', icon: '🎂' },
    lifestyleRisk: { label: 'Lifestyle Risk', icon: '🌟' },
    healthConditionRisk: { label: 'Health Conditions', icon: '🏥' },
    mentalHealthRisk: { label: 'Mental Health', icon: '🧠' }
  };

  return (
    <div className="grid gap-4 mt-4">
      {Object.entries(details).map(([key, value]) => (
        <div key={key} className="p-4 rounded-lg bg-white/50 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">{categories[key]?.icon}</span>
            <h4 className="font-medium text-slate-700">{categories[key]?.label}</h4>
          </div>
          <div className="flex items-center justify-between">
            <div className="w-full bg-slate-200 rounded-full h-2.5 mr-4">
              <div
                className="bg-rose-500 h-2.5 rounded-full"
                style={{ width: `${value}%` }}
              />
            </div>
            <span className="text-sm font-medium text-slate-600 whitespace-nowrap">
              {value}%
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

// Animation variants
const pageVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  },
  exit: { opacity: 0 }
};

const sectionVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

const InitialQuestionView = ({ onComplete }) => {
  const [answer, setAnswer] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  
  const handleSubmit = async () => {
    if (!answer) return;
    setIsAnimating(true);
    // Create confetti effect
    Array(20).fill().forEach((_, i) => {
      const confetti = document.createElement('div');
      confetti.className = 'absolute w-2 h-2 rounded-full pointer-events-none';
      confetti.style.backgroundColor = ['#F43F5E', '#2DD4BF', '#818CF8'][Math.floor(Math.random() * 3)];
      confetti.style.left = Math.random() * 100 + 'vw';
      confetti.style.top = '50vh';
      document.body.appendChild(confetti);

      const animation = confetti.animate([
        { transform: 'translate(0, 0) rotate(0deg)', opacity: 1 },
        { transform: `translate(${Math.random() * 200 - 100}px, ${-Math.random() * 500}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
      ], {
        duration: 1000 + Math.random() * 1000,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      });

      animation.onfinish = () => confetti.remove();
    });

    await new Promise(resolve => setTimeout(resolve, 500));
    onComplete(answer);
  };

  return (
    <motion.div 
      className="flex items-center justify-center min-h-screen p-8 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-rose-50"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="relative w-full max-w-lg">
        {/* Animated background shapes */}
        <motion.div 
          className="absolute rounded-full -z-10 w-96 h-96 bg-rose-200 blur-3xl opacity-20"
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div 
          className="absolute bottom-0 right-0 bg-blue-200 rounded-full -z-10 w-96 h-96 blur-3xl opacity-20"
          animate={{ 
            scale: [1.2, 1, 1.2],
            x: [0, -30, 0],
            y: [0, 50, 0]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />

        <motion.div 
          className="p-8 shadow-xl bg-white/80 backdrop-blur-xl rounded-2xl"
          variants={sectionVariants}
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="relative flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-full bg-rose-100"
          >
            <motion.div
              className="absolute inset-0 rounded-full bg-rose-500/20"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            <Heart className="relative z-10 w-10 h-10 text-rose-500" />
          </motion.div>
          
          <motion.h1 
            className="mb-6 text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-slate-600"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Welcome to Your Health Journey
          </motion.h1>
          
          <motion.p 
            className="mb-8 text-center text-slate-600"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            To get started, please answer this important question about your health:
          </motion.p>
          
          <motion.div 
            className="mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <label className="block mb-2 font-medium text-slate-700">What's your main health goal?</label>
            <motion.div className="relative">
              <motion.select
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                whileFocus={{ scale: 1.01 }}
                className="w-full p-3 transition-all bg-white border-2 rounded-lg hover:border-rose-200 focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
              >
                <option value="">Select your goal</option>
                <option value="prevention">Prevent health issues</option>
                <option value="improvement">Improve current health</option>
                <option value="maintenance">Maintain good health</option>
                <option value="specific">Address specific health concerns</option>
              </motion.select>
              <motion.div
                className="absolute w-4 h-4 transform rotate-45 -translate-y-1/2 border-b-2 border-r-2 pointer-events-none right-3 top-1/2 border-slate-400"
                animate={{ y: [0, 2, 0] }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            </motion.div>
          </motion.div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSubmit}
            disabled={!answer || isAnimating}
            className="relative w-full px-6 py-3 overflow-hidden text-white transition-colors rounded-lg bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-rose-400 to-rose-600"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <span className="relative">Continue to Your Profile</span>
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

const Profile = () => {
  const [answers, setAnswers] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [riskScore, setRiskScore] = useState(0);
  const [riskDetails, setRiskDetails] = useState(null);
  const [riskCategory, setRiskCategory] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasCompletedInitialProfile, setHasCompletedInitialProfile] = useState(true);
  const userId = localStorage.getItem('userId'); // Get actual user ID from storage

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const { profile, riskScore, riskDetails, category } = await fetchProfile(userId);
        setAnswers(profile);
        setRiskScore(riskScore);
        setRiskDetails(riskDetails);
        setRiskCategory(category);
        setHasCompletedInitialProfile(profile.hasCompletedInitialProfile);
        setIsEditing(!profile.hasCompletedInitialProfile);
      } catch (error) {
        console.error('Error loading profile:', error);
        setIsEditing(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      loadProfile();
    }
  }, [userId]);

  const handleInitialProfileComplete = async (healthGoal) => {
    try {
      await saveProfile(userId, {
        healthGoal,
        hasCompletedInitialProfile: true
      });
      setHasCompletedInitialProfile(true);
      setIsEditing(true); // Allow them to fill out the rest of their profile
    } catch (error) {
      console.error('Error saving initial profile:', error);
    }
  };

  const handleChange = (id, value) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  const handleSave = async () => {
    const requiredQuestions = [...questions.basic, ...questions.lifestyle];
    const answered = requiredQuestions.filter(q => answers[q.id]);

    if (answered.length < requiredQuestions.length) {
      alert('Please answer all required questions before saving');
      return;
    }

    try {
      const { riskScore, riskDetails, category } = await saveProfile(userId, answers);
      setRiskScore(riskScore);
      setRiskDetails(riskDetails);
      setRiskCategory(category);
      setIsEditing(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Failed to save profile. Please try again later.');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen p-8 bg-gradient-to-br from-slate-50 via-white to-rose-50">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center min-h-[60vh]">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop"
                }}
                className="inline-flex items-center justify-center p-3 mb-4 rounded-full bg-rose-100"
              >
                <Heart className="w-6 h-6 text-rose-500" />
              </motion.div>
              <p className="text-slate-600">Loading your health profile...</p>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  if (!hasCompletedInitialProfile) {
    return <InitialQuestionView onComplete={handleInitialProfileComplete} />;
  }

  return (
    <motion.div
      className="min-h-screen p-8 bg-gradient-to-br from-slate-50 via-white to-rose-50"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="relative mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.div
            className="absolute inset-0 -z-10"
            animate={{
              background: [
                'radial-gradient(circle at 20% 20%, rgba(244, 63, 94, 0.05) 0%, transparent 50%)',
                'radial-gradient(circle at 80% 80%, rgba(244, 63, 94, 0.05) 0%, transparent 50%)'
              ]
            }}
            transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
          />
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="inline-flex items-center justify-center p-2 mb-4 rounded-full bg-rose-100"
          >
            <Heart className="w-6 h-6 text-rose-500" />
          </motion.div>
          <h1 className="mb-2 text-4xl font-bold text-transparent bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text">
            Your Health Profile
          </h1>
          <p className="text-lg text-slate-600">
            Help us understand your health journey better
          </p>
        </motion.div>

        <div className="sticky z-10 p-6 mb-8 bg-white shadow-lg top-4 rounded-xl backdrop-blur-lg bg-opacity-90">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <RiskIndicator score={riskScore} category={riskCategory} />
              {riskDetails && <RiskDetailsCard details={riskDetails} />}
            </div>
            <div className="flex flex-col justify-between p-6 text-white bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl">
              <div className="mb-4">
                <Coffee className="w-8 h-8 mb-4 text-rose-400" />
                <h3 className="mb-2 text-xl font-semibold">Profile Status</h3>
                <p className="text-slate-300">
                  {isEditing 
                    ? 'Make sure to fill in all required fields'
                    : 'Your profile is complete and up to date'}
                </p>
              </div>
              <motion.button
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                className={`w-full px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-all ${
                  isEditing 
                    ? 'bg-rose-500 hover:bg-rose-600 text-white' 
                    : 'bg-white text-slate-800 hover:bg-rose-50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isEditing ? (
                  <>
                    <Save className="w-4 h-4" />
                    Save Profile
                  </>
                ) : (
                  <>
                    <Edit2 className="w-4 h-4" />
                    Edit Profile
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {showSuccess && (
            <motion.div
              className="p-4 mb-6 border bg-emerald-50 rounded-xl border-emerald-200"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-full bg-emerald-100">
                  <Shield className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-emerald-800">Profile Updated Successfully!</h3>
                  <p className="text-emerald-600">Your data helps us provide better recommendations.</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <Section title="Basic Health Information" icon="🧑‍⚕️">
          {questions.basic.map((q) => (
            <QuestionCard
              key={q.id}
              question={q}
              value={answers[q.id]}
              onChange={handleChange}
              isEditing={isEditing}
            />
          ))}
        </Section>

        <Section title="Lifestyle Factors" icon="🌟">
          {questions.lifestyle.map((q) => (
            <QuestionCard
              key={q.id}
              question={q}
              value={answers[q.id]}
              onChange={handleChange}
              isEditing={isEditing}
            />
          ))}
        </Section>

        <Section title="Daily Habits (Optional)" icon="⭐">
          {questions.habits.map((q) => (
            <QuestionCard
              key={q.id}
              question={q}
              value={answers[q.id]}
              onChange={handleChange}
              isEditing={isEditing}
            />
          ))}
        </Section>

        {!isEditing && (
          <motion.div
            className="p-8 mt-8 overflow-hidden text-white bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="relative">
              <motion.div
                className="absolute inset-0 opacity-10"
                animate={{
                  background: [
                    'radial-gradient(circle at 0% 0%, rgba(255,255,255,0.2) 0%, transparent 50%)',
                    'radial-gradient(circle at 100% 100%, rgba(255,255,255,0.2) 0%, transparent 50%)'
                  ]
                }}
                transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
              />
              <div className="relative">
                <h2 className="mb-4 text-2xl font-bold">What's Next?</h2>
                <p className="mb-6 text-slate-300">
                  Based on your profile, we'll customize your daily tips and risk assessments. Remember to:
                </p>
                <div className="grid gap-4 md:grid-cols-3">
                  <motion.div
                    className="p-4 rounded-lg bg-white/10 backdrop-blur-sm"
                    whileHover={{ scale: 1.02 }}
                  >
                    <Activity className="w-6 h-6 mb-3 text-rose-400" />
                    <h3 className="mb-2 font-semibold">Daily Check-ins</h3>
                    <p className="text-sm text-slate-300">Complete your check-ins regularly for better insights</p>
                  </motion.div>
                  <motion.div
                    className="p-4 rounded-lg bg-white/10 backdrop-blur-sm"
                    whileHover={{ scale: 1.02 }}
                  >
                    <Heart className="w-6 h-6 mb-3 text-rose-400" />
                    <h3 className="mb-2 font-semibold">Track Progress</h3>
                    <p className="text-sm text-slate-300">Monitor your improvements in weekly reports</p>
                  </motion.div>
                  <motion.div
                    className="p-4 rounded-lg bg-white/10 backdrop-blur-sm"
                    whileHover={{ scale: 1.02 }}
                  >
                    <Shield className="w-6 h-6 mb-3 text-rose-400" />
                    <h3 className="mb-2 font-semibold">Stay Updated</h3>
                    <p className="text-sm text-slate-300">Keep your profile current as things change</p>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Profile;