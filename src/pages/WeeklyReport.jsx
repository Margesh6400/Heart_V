import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';

// Dummy data for the week
const weeklyData = [
  { day: 'Mon', water: 8, exercise: 30, stress: 3, sleep: 7, risk: 25 },
  { day: 'Tue', water: 6, exercise: 45, stress: 2, sleep: 8, risk: 22 },
  { day: 'Wed', water: 9, exercise: 20, stress: 4, sleep: 6, risk: 35 },
  { day: 'Thu', water: 7, exercise: 60, stress: 2, sleep: 7.5, risk: 20 },
  { day: 'Fri', water: 8, exercise: 40, stress: 3, sleep: 7, risk: 28 },
  { day: 'Sat', water: 5, exercise: 15, stress: 5, sleep: 6.5, risk: 40 },
  { day: 'Sun', water: 7, exercise: 50, stress: 2, sleep: 8, risk: 25 }
];

const weeklyAverages = {
  water: 7.1,
  exercise: 37.1,
  stress: 3,
  sleep: 7.1,
  risk: 27.9
};

const goalProgress = [
  { goal: 'Daily Water Intake', target: 8, current: 7.1, unit: 'glasses' },
  { goal: 'Exercise Time', target: 45, current: 37.1, unit: 'minutes' },
  { goal: 'Sleep Duration', target: 8, current: 7.1, unit: 'hours' },
  { goal: 'Stress Level', target: 2, current: 3, unit: 'level' }
];

const StatCard = ({ title, value, change, unit }) => (
  <motion.div
    className="p-6 bg-white shadow-sm rounded-xl"
    whileHover={{ scale: 1.02 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
  >
    <h3 className="text-sm font-medium text-slate-600">{title}</h3>
    <div className="flex items-end justify-between mt-2">
      <p className="text-2xl font-semibold text-slate-900">
        {value}
        <span className="ml-1 text-sm font-normal text-slate-500">{unit}</span>
      </p>
      {change && (
        <p className={`text-sm ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
          {change > 0 ? '↑' : '↓'} {Math.abs(change)}%
        </p>
      )}
    </div>
  </motion.div>
);

const GoalProgressCard = ({ goal, target, current, unit }) => {
  const progress = (current / target) * 100;
  const color = progress >= 100 ? 'emerald' : progress >= 75 ? 'blue' : 'rose';

  return (
    <motion.div
      className="p-4 bg-white rounded-lg shadow-sm"
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-slate-700">{goal}</span>
        <span className="text-sm text-slate-500">
          {current} / {target} {unit}
        </span>
      </div>
      <div className="w-full h-2 overflow-hidden rounded-full bg-slate-100">
        <motion.div
          className={`h-full bg-${color}-500`}
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(progress, 100)}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
};

const WeeklyReport = () => {
  const [activeMetric, setActiveMetric] = useState('all');

  const metrics = {
    all: ['water', 'exercise', 'stress', 'sleep'],
    water: ['water'],
    exercise: ['exercise'],
    wellness: ['stress', 'sleep']
  };

  return (
    <div className="min-h-screen p-8 bg-slate-50">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-slate-900">Your Weekly Health Journey</h1>
          <p className="mt-2 text-slate-600">Here's how you're tracking for the week of April 7-13, 2025</p>
        </motion.div>

        {/* Weekly Averages */}
        <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Avg. Water Intake"
            value={weeklyAverages.water}
            unit="glasses"
            change={5}
          />
          <StatCard
            title="Avg. Exercise Time"
            value={weeklyAverages.exercise}
            unit="min"
            change={-2}
          />
          <StatCard
            title="Avg. Sleep Duration"
            value={weeklyAverages.sleep}
            unit="hrs"
            change={3}
          />
          <StatCard
            title="Avg. Risk Score"
            value={weeklyAverages.risk}
            unit="%"
            change={-8}
          />
        </div>

        {/* Main Chart */}
        <motion.div
          className="p-6 mb-8 bg-white shadow-sm rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="mb-6 space-x-4">
            {Object.keys(metrics).map((metric) => (
              <button
                key={metric}
                onClick={() => setActiveMetric(metric)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeMetric === metric
                    ? 'bg-rose-100 text-rose-700'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {metric.charAt(0).toUpperCase() + metric.slice(1)}
              </button>
            ))}
          </div>
          
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                {metrics[activeMetric].includes('water') && (
                  <Line type="monotone" dataKey="water" stroke="#3B82F6" name="Water (glasses)" />
                )}
                {metrics[activeMetric].includes('exercise') && (
                  <Line type="monotone" dataKey="exercise" stroke="#10B981" name="Exercise (min)" />
                )}
                {metrics[activeMetric].includes('stress') && (
                  <Line type="monotone" dataKey="stress" stroke="#EF4444" name="Stress Level" />
                )}
                {metrics[activeMetric].includes('sleep') && (
                  <Line type="monotone" dataKey="sleep" stroke="#8B5CF6" name="Sleep (hours)" />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Risk Trend */}
        <motion.div
          className="p-6 mb-8 bg-white shadow-sm rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="mb-6 text-xl font-semibold text-slate-800">Risk Score Trend</h2>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="risk"
                  stroke="#F43F5E"
                  fill="#FEE2E2"
                  name="Risk Score"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Goals Progress */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="mb-6 text-xl font-semibold text-slate-800">Weekly Goals Progress</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {goalProgress.map((goal) => (
              <GoalProgressCard
                key={goal.goal}
                goal={goal.goal}
                target={goal.target}
                current={goal.current}
                unit={goal.unit}
              />
            ))}
          </div>
        </motion.div>

        {/* Weekly Insights */}
        <motion.div
          className="p-6 shadow-sm bg-gradient-to-br from-rose-50 to-slate-50 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="mb-4 text-xl font-semibold text-slate-800">Weekly Insights</h2>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-white/80">
              <h3 className="font-medium text-rose-600">Areas of Improvement</h3>
              <p className="mt-1 text-sm text-slate-600">
                Exercise duration dropped by 2% compared to last week. Try to maintain consistency in your workout routine.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-white/80">
              <h3 className="font-medium text-green-600">Notable Achievements</h3>
              <p className="mt-1 text-sm text-slate-600">
                Water intake improved by 5% and your average risk score decreased by 8%. Keep up the good work!
              </p>
            </div>
            <div className="p-4 rounded-lg bg-white/80">
              <h3 className="font-medium text-blue-600">Recommendations</h3>
              <p className="mt-1 text-sm text-slate-600">
                Consider adding 10 more minutes to your daily exercise routine to meet your weekly goal.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default WeeklyReport;