import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Switch } from "@headlessui/react";
import { useTheme } from "../context/ThemeContext";

const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const [notifications, setNotifications] = React.useState(true);
  const [emailUpdates, setEmailUpdates] = React.useState(false);
  const [dataSharing, setDataSharing] = React.useState(true);
  const [selectedSection, setSelectedSection] = React.useState("general");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1
    }
  };

  const sections = {
    general: "General",
    profile: "Profile",
    privacy: "Privacy & Data",
    advanced: "Advanced"
  };

  return (
    <motion.div
      className="min-h-screen p-8 bg-gradient-to-br from-slate-50 via-white to-rose-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div variants={itemVariants} className="pb-4 border-b border-slate-200 dark:border-slate-700">
          <h1 className="mb-4 text-3xl font-bold text-transparent bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-200 dark:to-slate-400 bg-clip-text">Settings</h1>
          <p className="text-slate-600 dark:text-slate-400">Manage your preferences and configurations here.</p>
        </motion.div>

        <div className="flex gap-6 mt-8">
          {/* Settings Navigation */}
          <motion.div variants={itemVariants} className="w-1/4">
            <div className="space-y-2">
              {Object.entries(sections).map(([key, value]) => (
                <motion.button
                  key={key}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedSection(key)}
                  className={`w-full text-left px-4 py-2 rounded-lg ${
                    selectedSection === key
                      ? "bg-rose-500 text-white"
                      : "text-slate-600 dark:text-slate-300 hover:bg-rose-50 dark:hover:bg-rose-900/20"
                  }`}
                >
                  {value}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Settings Content */}
          <motion.div variants={itemVariants} className="w-3/4">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-6 space-y-6 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl"
              >
                {selectedSection === "general" && (
                  <>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200">Dark Mode</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Toggle dark/light theme</p>
                      </div>
                      <Switch
                        checked={theme === 'dark'}
                        onChange={toggleTheme}
                        className={`${
                          theme === 'dark' ? "bg-rose-500" : "bg-slate-200"
                        } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
                      >
                        <span
                          className={`${
                            theme === 'dark' ? "translate-x-6" : "translate-x-1"
                          } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                        />
                      </Switch>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200">Push Notifications</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Receive push notifications</p>
                      </div>
                      <Switch
                        checked={notifications}
                        onChange={setNotifications}
                        className={`${
                          notifications ? "bg-rose-500" : "bg-slate-200"
                        } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
                      >
                        <span
                          className={`${
                            notifications ? "translate-x-6" : "translate-x-1"
                          } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                        />
                      </Switch>
                    </div>
                  </>
                )}

                {selectedSection === "profile" && (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200">Profile Information</h3>
                      <motion.div
                        className="space-y-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                            Display Name
                          </label>
                          <input
                            type="text"
                            className="block w-full mt-1 rounded-lg shadow-sm border-slate-300 focus:border-rose-500 focus:ring-rose-500 focus:ring-2 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-slate-200"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                            Email
                          </label>
                          <input
                            type="email"
                            className="block w-full mt-1 rounded-lg shadow-sm border-slate-300 focus:border-rose-500 focus:ring-rose-500 focus:ring-2 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-slate-200"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                            Bio
                          </label>
                          <textarea
                            className="block w-full mt-1 rounded-lg shadow-sm border-slate-300 focus:border-rose-500 focus:ring-rose-500 focus:ring-2 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-slate-200"
                            rows={3}
                          />
                        </div>
                      </motion.div>
                    </div>
                  </div>
                )}

                {selectedSection === "privacy" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200">Data Sharing</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          Allow anonymous data collection
                        </p>
                      </div>
                      <Switch
                        checked={dataSharing}
                        onChange={setDataSharing}
                        className={`${
                          dataSharing ? "bg-rose-500" : "bg-slate-200"
                        } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
                      >
                        <span
                          className={`${
                            dataSharing ? "translate-x-6" : "translate-x-1"
                          } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                        />
                      </Switch>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200">Email Updates</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Receive email notifications</p>
                      </div>
                      <Switch
                        checked={emailUpdates}
                        onChange={setEmailUpdates}
                        className={`${
                          emailUpdates ? "bg-rose-500" : "bg-slate-200"
                        } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
                      >
                        <span
                          className={`${
                            emailUpdates ? "translate-x-6" : "translate-x-1"
                          } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                        />
                      </Switch>
                    </div>
                  </div>
                )}

                {selectedSection === "advanced" && (
                  <div className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-4"
                    >
                      <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200">Advanced Settings</h3>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                          Data Export
                        </label>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="px-4 py-2 mt-2 rounded-lg text-slate-700 bg-slate-100 hover:bg-slate-200 dark:text-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600"
                        >
                          Export All Data
                        </motion.button>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                          Account Actions
                        </label>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="px-4 py-2 mt-2 text-red-700 bg-red-100 rounded-lg hover:bg-red-200 dark:text-red-200 dark:bg-red-700 dark:hover:bg-red-600"
                        >
                          Delete Account
                        </motion.button>
                      </div>
                    </motion.div>
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-4 py-2 mt-6 text-white transition-colors rounded-lg bg-rose-500 hover:bg-rose-600"
                >
                  Save Changes
                </motion.button>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Settings;