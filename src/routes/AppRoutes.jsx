// routes/AppRoutes.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Onboarding from "../pages/Onboarding";
import Dashboard from "../pages/Dashboard";
import DailyCheckIn from "../pages/DailyCheckIn";
import DailyReport from "../pages/DailyReport";
import MainReport from "../pages/MainReport";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import WeeklyReport from "../pages/WeeklyReport";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/signin" />;
  }
  return children;
};

const AppRoutes = () => (
  <Routes>
    {/* Public Routes */}
    <Route path="/signin" element={<SignIn />} />
    <Route path="/signup" element={<SignUp />} />

    {/* Protected Routes */}
    <Route path="/" element={
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    } />
    <Route path="/onboarding" element={
      <ProtectedRoute>
        <Onboarding />
      </ProtectedRoute>
    } />
    <Route path="/checkin" element={
      <ProtectedRoute>
        <DailyCheckIn />
      </ProtectedRoute>
    } />
    <Route path="/daily-report" element={
      <ProtectedRoute>
        <DailyReport />
      </ProtectedRoute>
    } />
    <Route path="/weekly-report" element={
      <ProtectedRoute>
        <WeeklyReport />
      </ProtectedRoute>
    } />
    <Route path="/main-report" element={
      <ProtectedRoute>
        <MainReport />
      </ProtectedRoute>
    } />
    <Route path="/profile" element={
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    } />
    <Route path="/settings" element={
      <ProtectedRoute>
        <Settings />
      </ProtectedRoute>
    } />
  </Routes>
);

export default AppRoutes;