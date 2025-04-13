// Onboarding.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Heart, Shield, Activity, Calendar } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="p-6 bg-white border shadow-sm rounded-xl border-slate-200"
  >
    <Icon className="w-8 h-8 mb-4 text-rose-500" />
    <h3 className="mb-2 text-xl font-semibold text-slate-800">{title}</h3>
    <p className="text-slate-600">{description}</p>
  </motion.div>
);

const Onboarding = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-slate-50">
      <div className="max-w-6xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center justify-center p-2 mb-8 rounded-full bg-rose-100"
          >
            <Heart className="w-8 h-8 text-rose-500" />
          </motion.div>
          <h1 className="mb-6 text-4xl font-bold text-slate-900 sm:text-5xl">
            Take Control of Your Heart Health
          </h1>
          <p className="max-w-3xl mx-auto mb-8 text-xl text-slate-600">
            Track your daily habits, understand your risk factors, and make informed decisions about your heart health with personalized insights.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/checkin')}
            className="inline-flex items-center px-6 py-3 text-lg font-semibold text-white transition-colors rounded-lg bg-rose-500 hover:bg-rose-600"
          >
            Get Started <ArrowRight className="w-5 h-5 ml-2" />
          </motion.button>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={Activity}
            title="Daily Health Tracking"
            description="Log your daily activities, diet, and lifestyle choices to build a comprehensive health profile."
          />
          <FeatureCard
            icon={Shield}
            title="Risk Assessment"
            description="Get personalized risk assessments based on your daily habits and health indicators."
          />
          <FeatureCard
            icon={Calendar}
            title="Progress Monitoring"
            description="Track your improvement over time with detailed reports and actionable insights."
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="p-8 mt-16 bg-white border shadow-sm rounded-2xl border-slate-200"
        >
          <h2 className="mb-4 text-2xl font-bold text-center text-slate-800">
            Why Choose DilCare?
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              "Personalized health insights",
              "Daily progress tracking",
              "Expert recommendations",
              "Easy-to-use interface"
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="flex items-center p-4 rounded-lg bg-slate-50"
              >
                <div className="w-2 h-2 mr-3 rounded-full bg-rose-500" />
                <span className="text-slate-700">{feature}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Onboarding;