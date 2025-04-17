// components/Header.jsx
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { 
  Menu, 
  X, 
  Heart, 
  User, 
  Bell, 
  ClipboardCheck, 
  BarChart2, 
  LineChart,
  Settings,
  HelpCircle,
  Sun,
  Moon,
  LogOut
} from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  const isActiveRoute = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  const NavLink = ({ to, icon: Icon, children }) => (
    <Link 
      to={to} 
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
        isActiveRoute(to) 
          ? 'bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-400' 
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-gray-100 dark:hover:bg-gray-800'
      }`}
    >
      <Icon className={`w-4 h-4 ${isActiveRoute(to) ? 'text-rose-500' : ''}`} />
      <span className="font-medium">{children}</span>
    </Link>
  );

  if (!user && !['/', '/signin', '/signup'].includes(location.pathname)) {
    return null;
  }

  return (
    <motion.header 
      className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm dark:bg-slate-900 dark:border-gray-800"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
            >
              <Heart className="w-8 h-8 text-rose-500" />
            </motion.div>
            <motion.span 
              className="text-xl font-bold bg-gradient-to-r from-rose-500 to-rose-600 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
            >
              DilCare
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          {user && (
            <nav className="hidden md:flex items-center space-x-2">
              <NavLink to="/checkin" icon={ClipboardCheck}>
                Daily Check-In
              </NavLink>
              <NavLink to="/daily-report" icon={BarChart2}>
                Daily Report
              </NavLink>
              <NavLink to="/main-report" icon={LineChart}>
                Main Report
              </NavLink>
            </nav>
          )}

          {/* Right Section */}
          <div className="flex items-center space-x-2">
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-2 rounded-lg transition-colors ${
                theme === 'light' 
                  ? 'text-amber-500 hover:bg-amber-50' 
                  : 'text-blue-400 hover:bg-blue-900/20'
              }`}
            >
              {theme === 'light' ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </motion.button>

            {user ? (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 text-gray-400 hover:text-blue-500 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 dark:hover:text-blue-400 transition-colors"
                >
                  <Bell className="w-5 h-5" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 text-gray-400 hover:text-purple-500 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 dark:hover:text-purple-400 transition-colors"
                >
                  <HelpCircle className="w-5 h-5" />
                </motion.button>

                <Link to="/profile">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative p-1 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-900/20"
                  >
                    <div className="w-8 h-8 rounded-lg bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center">
                      <User className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                    </div>
                  </motion.div>
                </Link>

                <Link to="/settings">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 text-gray-400 hover:text-green-500 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 dark:hover:text-green-400 transition-colors"
                  >
                    <Settings className="w-5 h-5" />
                  </motion.div>
                </Link>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 dark:hover:text-red-400 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                </motion.button>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                {location.pathname !== '/signin' && (
                  <Link
                    to="/signin"
                    className="px-4 py-2 text-rose-600 font-medium hover:bg-rose-50 rounded-lg transition-colors"
                  >
                    Sign In
                  </Link>
                )}
                {location.pathname !== '/signup' && (
                  <Link
                    to="/signup"
                    className="px-4 py-2 bg-rose-500 text-white font-medium hover:bg-rose-600 rounded-lg transition-colors"
                  >
                    Sign Up
                  </Link>
                )}
              </div>
            )}

            {/* Mobile menu button */}
            {user && (
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg text-gray-400 hover:text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.button>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && user && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-100 dark:border-gray-800"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                <NavLink to="/checkin" icon={ClipboardCheck}>
                  Daily Check-In
                </NavLink>
                <NavLink to="/daily-report" icon={BarChart2}>
                  Daily Report
                </NavLink>
                <NavLink to="/main-report" icon={LineChart}>
                  Main Report
                </NavLink>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;