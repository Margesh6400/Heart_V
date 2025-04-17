import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, Mail, Lock, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const formVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      type: "spring",
      stiffness: 100,
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
};

const inputVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 }
  }
};

const SignUp = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3001/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create account');
      }

      // Use the login function from AuthContext
      login(data.user, data.token);

      // Redirect to onboarding
      navigate('/onboarding');
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="flex items-center justify-center min-h-screen p-4 overflow-hidden bg-gradient-to-br from-slate-50 to-rose-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md"
      >
        {/* Animated background shapes */}
        <motion.div 
          className="absolute rounded-full -z-10 w-72 h-72 bg-rose-200 blur-3xl opacity-20"
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, -50, 0],
            y: [0, 30, 0]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div 
          className="absolute top-0 right-0 bg-blue-200 rounded-full -z-10 w-72 h-72 blur-3xl opacity-20"
          animate={{ 
            scale: [1.2, 1, 1.2],
            x: [0, 30, 0],
            y: [0, -50, 0]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />

        <motion.div 
          className="p-8 shadow-xl bg-white/80 backdrop-blur-xl rounded-2xl"
          variants={formVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="relative mb-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 500,
                delay: 0.2,
                duration: 0.5
              }}
              className="relative inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-rose-100"
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
              <UserPlus className="relative z-10 w-8 h-8 text-rose-500" />
            </motion.div>
            <motion.h2 
              className="text-3xl font-bold text-slate-800"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Create Account
            </motion.h2>
            <motion.p 
              className="mt-2 text-slate-600"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Start your health journey today
            </motion.p>
          </div>

          <motion.form 
            onSubmit={handleSubmit} 
            className="space-y-6"
            variants={formVariants}
          >
            <motion.div variants={inputVariants}>
              <label className="block mb-2 text-sm font-medium text-slate-700">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <User className="w-5 h-5 text-slate-400" />
                </div>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full py-2 pl-10 pr-3 transition-all border rounded-lg border-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>
            </motion.div>

            <motion.div variants={inputVariants}>
              <label className="block mb-2 text-sm font-medium text-slate-700">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Mail className="w-5 h-5 text-slate-400" />
                </div>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full py-2 pl-10 pr-3 transition-all border rounded-lg border-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>
            </motion.div>

            <motion.div variants={inputVariants}>
              <label className="block mb-2 text-sm font-medium text-slate-700">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Lock className="w-5 h-5 text-slate-400" />
                </div>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full py-2 pl-10 pr-3 transition-all border rounded-lg border-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder="Create a password"
                />
              </div>
            </motion.div>

            <motion.div variants={inputVariants}>
              <label className="block mb-2 text-sm font-medium text-slate-700">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Lock className="w-5 h-5 text-slate-400" />
                </div>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="password"
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="block w-full py-2 pl-10 pr-3 transition-all border rounded-lg border-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder="Confirm your password"
                />
              </div>
            </motion.div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 text-sm text-red-700 rounded-lg bg-red-50"
              >
                {error}
              </motion.div>
            )}

            <motion.button
              variants={inputVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-lg text-white font-medium relative overflow-hidden ${
                isLoading
                  ? 'bg-slate-400 cursor-not-allowed'
                  : 'bg-rose-500 hover:bg-rose-600'
              }`}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-rose-400 to-rose-600"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <span className="relative">
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </span>
            </motion.button>
          </motion.form>

          <motion.div 
            variants={inputVariants}
            className="mt-6 text-center"
          >
            <p className="text-sm text-slate-600">
              Already have an account?{' '}
              <Link to="/signin" className="font-medium text-rose-500 hover:text-rose-600">
                Sign in
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default SignUp;