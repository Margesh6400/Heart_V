// pages/DailyReport.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';

const DailyReport = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const formData = state?.formData || {};

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
          initial={{ y: -20 }}
          animate={{ y: 0 }}
        >
          <h2 className="text-4xl font-bold text-transparent bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text">
            Daily Report
          </h2>
          <p className="mt-2 text-slate-600">Here's your wellness summary</p>
        </motion.div>

        {/* Add your report visualization here */}

        <motion.button
          onClick={() => navigate('/')}
          className="px-6 py-3 mt-8 text-white rounded-xl bg-slate-800 hover:bg-slate-700"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Back to Check-In
        </motion.button>
      </div>
    </motion.div>
  );
};

export default DailyReport;
