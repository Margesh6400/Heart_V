// routes/AppRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Onboarding from "../pages/Onboarding";
import Dashboard from "../pages/Dashboard";
import DailyCheckIn from "../pages/DailyCheckIn";
import DailyReport from "../pages/DailyReport";
import MainReport from "../pages/MainReport";
import Profile from "../pages/Profile";
import WeeklyReport from "../pages/WeeklyReport";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/onboarding" element={<Onboarding />} />
    <Route path="/checkin" element={<DailyCheckIn />} />
    <Route path="/daily-report" element={<DailyReport />} />
    <Route path="/weekly-report" element={<WeeklyReport />} />
    <Route path="/main-report" element={<MainReport />} />
    <Route path="/profile" element={<Profile />} />
  </Routes>
);

export default AppRoutes;