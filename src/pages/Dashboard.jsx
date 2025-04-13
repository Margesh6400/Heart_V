// pages/Dashboard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LineChart, BarChart2, User, Heart, Activity, Droplets, Plus } from "lucide-react";
import PieChart from "../components/PieChart";

const StatCard = ({ icon: Icon, label, value, trend }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="p-4 bg-white rounded-xl shadow-sm border border-slate-200"
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-rose-100 rounded-lg">
          <Icon className="w-5 h-5 text-rose-500" />
        </div>
        <div>
          <p className="text-sm text-slate-600">{label}</p>
          <p className="text-xl font-semibold text-slate-800">{value}</p>
        </div>
      </div>
      {trend && (
        <span className={`text-sm ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
          {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
        </span>
      )}
    </div>
  </motion.div>
);

const TipCard = ({ tip }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="p-4 bg-blue-50 rounded-lg"
  >
    <p className="text-blue-800">💡 {tip}</p>
  </motion.div>
);

const Dashboard = () => {
  // Mock risk data
  const riskData = [
    { name: "High Risk", value: 30 },
    { name: "Medium Risk", value: 45 },
    { name: "Low Risk", value: 25 }
  ];

  const healthTips = [
    "Try to take a 10-minute walk after each meal",
    "Stay hydrated - set reminders to drink water",
    "Practice deep breathing when feeling stressed"
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Enhanced Header Section */}
        <div className="relative mb-8 p-6 rounded-2xl bg-gradient-to-r from-rose-500 to-rose-600 text-white overflow-hidden">
          <motion.div
            className="absolute inset-0 opacity-10"
            animate={{ 
              background: [
                "radial-gradient(circle at 0% 0%, rgba(255,255,255,0.2) 0%, transparent 50%)",
                "radial-gradient(circle at 100% 100%, rgba(255,255,255,0.2) 0%, transparent 50%)"
              ]
            }}
            transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
          />
          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="mb-2 inline-flex items-center space-x-2 bg-white/10 rounded-full px-3 py-1"
              >
                <Heart className="w-4 h-4" />
                <span className="text-sm font-medium">Your Health Dashboard</span>
              </motion.div>
              <h1 className="text-3xl font-bold md:text-4xl">Welcome to DilCare</h1>
              <p className="mt-2 text-rose-100">Track your heart health journey with personalized insights</p>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/checkin"
                className="inline-flex items-center px-4 py-2 bg-white text-rose-600 rounded-lg font-medium shadow-lg hover:bg-rose-50 transition-colors"
              >
                <Plus className="w-5 h-5 mr-2" />
                Daily Check-In
              </Link>
            </motion.div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <StatCard
            icon={Heart}
            label="Heart Health Score"
            value="85/100"
            trend={5}
          />
          <StatCard
            icon={Activity}
            label="Activity Level"
            value="Moderate"
            trend={-2}
          />
          <StatCard
            icon={Droplets}
            label="Water Intake"
            value="2.5L"
            trend={10}
          />
          <StatCard
            icon={User}
            label="Mood Today"
            value="Good"
          />
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <motion.div
            className="lg:col-span-2 p-6 bg-white rounded-xl shadow-sm border border-slate-200"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-xl font-semibold text-slate-800 mb-6">Risk Assessment</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex justify-center">
                <PieChart data={riskData} />
              </div>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-red-50">
                  <h3 className="font-semibold text-red-700">High Risk Factors</h3>
                  <p className="text-sm text-red-600">Blood pressure needs attention</p>
                </div>
                <div className="p-4 rounded-lg bg-yellow-50">
                  <h3 className="font-semibold text-yellow-700">Areas to Improve</h3>
                  <p className="text-sm text-yellow-600">Diet and exercise routine</p>
                </div>
                <div className="p-4 rounded-lg bg-green-50">
                  <h3 className="font-semibold text-green-700">Well Managed</h3>
                  <p className="text-sm text-green-600">Sleep and stress levels</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="p-6 bg-white rounded-xl shadow-sm border border-slate-200"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-xl font-semibold text-slate-800 mb-6">Daily Tips</h2>
            <div className="space-y-4">
              {healthTips.map((tip, index) => (
                <TipCard key={index} tip={tip} />
              ))}
            </div>
            <Link
              to="/main-report"
              className="mt-6 inline-flex items-center text-rose-500 hover:text-rose-600"
            >
              View detailed report <BarChart2 className="ml-2 w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-4">
          <Link to="/checkin" className="block p-4 bg-rose-50 rounded-xl hover:bg-rose-100 transition-colors">
            <h2 className="text-lg font-semibold text-rose-800">📝 Daily Check-In</h2>
            <p className="mt-1 text-sm text-rose-600">Log today's activities</p>
          </Link>

          <Link to="/daily-report" className="block p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
            <h2 className="text-lg font-semibold text-blue-800">📊 Today's Report</h2>
            <p className="mt-1 text-sm text-blue-600">View your daily stats</p>
          </Link>

          <Link to="/main-report" className="block p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors">
            <h2 className="text-lg font-semibold text-green-800">📈 Progress Report</h2>
            <p className="mt-1 text-sm text-green-600">Track improvements</p>
          </Link>

          <Link to="/profile" className="block p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors">
            <h2 className="text-lg font-semibold text-purple-800">👤 Profile</h2>
            <p className="mt-1 text-sm text-purple-600">Update your info</p>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;