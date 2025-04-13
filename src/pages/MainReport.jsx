// MainReport.jsx
import React from 'react';
import { motion } from 'framer-motion';
import PieChart from '../components/PieChart';

const MainReport = () => {
  // Mock data for demonstration
  const currentRiskData = [
    { name: "High Risk", value: 30 },
    { name: "Medium Risk", value: 45 },
    { name: "Low Risk", value: 25 }
  ];

  const historicalRiskData = [
    { name: "High Risk", value: 40 },
    { name: "Medium Risk", value: 35 },
    { name: "Low Risk", value: 25 }
  ];

  return (
    <motion.div 
      className="max-w-6xl p-6 mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="mb-6 text-3xl font-bold text-slate-800">📈 Overall Health Report</h1>
      
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <motion.div 
          className="p-6 bg-white border rounded-xl shadow-sm"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="mb-4 text-xl font-semibold text-slate-800">Current Risk Assessment</h2>
          <div className="flex justify-center mb-4">
            <PieChart data={currentRiskData} />
          </div>
          <div className="space-y-3">
            <div className="p-3 bg-red-50 rounded-lg">
              <span className="font-medium text-red-700">High Risk (30%)</span>
              <p className="text-sm text-red-600">Key concerns: Blood pressure, Cholesterol</p>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <span className="font-medium text-orange-700">Medium Risk (45%)</span>
              <p className="text-sm text-orange-600">Areas to improve: Diet, Exercise</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <span className="font-medium text-green-700">Low Risk (25%)</span>
              <p className="text-sm text-green-600">Well managed: Sleep, Stress</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="p-6 bg-white border rounded-xl shadow-sm"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="mb-4 text-xl font-semibold text-slate-800">Previous Month Comparison</h2>
          <div className="flex justify-center mb-4">
            <PieChart data={historicalRiskData} />
          </div>
          <div className="p-4 mt-4 bg-blue-50 rounded-lg">
            <h3 className="mb-2 text-lg font-medium text-blue-800">Risk Trend Analysis</h3>
            <ul className="space-y-2 text-sm text-blue-700">
              <li>• High risk reduced by 10% from last month</li>
              <li>• Medium risk increased slightly</li>
              <li>• Low risk remained stable</li>
            </ul>
          </div>
        </motion.div>

        <motion.div 
          className="p-6 bg-white border rounded-xl shadow-sm md:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="mb-4 text-xl font-semibold text-slate-800">Recommendations</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="p-4 bg-purple-50 rounded-lg">
              <h3 className="mb-2 text-lg font-medium text-purple-800">Diet Changes</h3>
              <p className="text-sm text-purple-700">Reduce oil intake and increase fiber-rich foods</p>
            </div>
            <div className="p-4 bg-pink-50 rounded-lg">
              <h3 className="mb-2 text-lg font-medium text-pink-800">Exercise Plan</h3>
              <p className="text-sm text-pink-700">Add 20 minutes of daily walking to your routine</p>
            </div>
            <div className="p-4 bg-indigo-50 rounded-lg">
              <h3 className="mb-2 text-lg font-medium text-indigo-800">Lifestyle Goals</h3>
              <p className="text-sm text-indigo-700">Focus on stress management techniques</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MainReport;