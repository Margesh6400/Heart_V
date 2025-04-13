import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PieChart from "./PieChart";

// Mock risk data
const riskData = [
  { name: "High Risk", value: 30 },
  { name: "Medium Risk", value: 45 },
  { name: "Low Risk", value: 25 }
];

const DashboardCard = ({ to, icon, title, description }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <Link to={to} className="block p-6 transition-colors border bg-slate-100 hover:bg-slate-200 rounded-xl border-slate-300">
      <h2 className="text-xl font-semibold text-slate-800">{icon} {title}</h2>
      <p className="mt-2 text-sm text-slate-600">{description}</p>
    </Link>
  </motion.div>
);

const Dashboard = () => {
  return (
    <div className="max-w-4xl p-6 mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="mb-4 text-3xl font-bold text-slate-800">💖 Welcome to DilCare</h1>
        <p className="mb-8 text-slate-600">Your daily heart-health assistant — track habits, reduce risk, and take care of your dil (heart) everyday.</p>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-slate-800">Quick Actions</h2>
            <div className="grid grid-cols-1 gap-4">
              <DashboardCard
                to="/checkin"
                icon="📝"
                title="Daily Check-In"
                description="Log today's food, mood, water & more"
              />
              <DashboardCard
                to="/daily-report"
                icon="📊"
                title="Today's Report"
                description="See your heart-health score for the day"
              />
              <DashboardCard
                to="/main-report"
                icon="📈"
                title="Overall Report"
                description="Track your risk, habits & improvements"
              />
              <DashboardCard
                to="/profile"
                icon="👤"
                title="Profile"
                description="Manage your info & one-time questions"
              />
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-slate-800">Your Risk Assessment</h2>
            <div className="p-6 bg-white border shadow-sm rounded-xl border-slate-200">
              <div className="flex justify-center mb-4">
                <PieChart data={riskData} />
              </div>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-red-50">
                  <h3 className="font-semibold text-red-700">High Risk Factors (30%)</h3>
                  <p className="text-sm text-red-600">Blood pressure and cholesterol levels need attention</p>
                </div>
                <div className="p-4 rounded-lg bg-orange-50">
                  <h3 className="font-semibold text-orange-700">Medium Risk Factors (45%)</h3>
                  <p className="text-sm text-orange-600">Diet and exercise routine can be improved</p>
                </div>
                <div className="p-4 rounded-lg bg-green-50">
                  <h3 className="font-semibold text-green-700">Low Risk Factors (25%)</h3>
                  <p className="text-sm text-green-600">Good sleep patterns and stress management</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;