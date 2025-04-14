import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Switch } from "@headlessui/react";

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(false);
  const [dataSharing, setDataSharing] = useState(true);
  const [selectedSection, setSelectedSection] = useState("general");

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
      className="max-w-4xl p-6 mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="pb-4 border-b">
        <h1 className="mb-4 text-3xl font-bold">Settings</h1>
        <p className="text-gray-600">Manage your preferences and configurations here.</p>
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
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-100"
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
              className="space-y-6"
            >
              {selectedSection === "general" && (
                <>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium">Dark Mode</h3>
                      <p className="text-sm text-gray-500">Toggle dark/light theme</p>
                    </div>
                    <Switch
                      checked={darkMode}
                      onChange={setDarkMode}
                      className={`${
                        darkMode ? "bg-blue-600" : "bg-gray-200"
                      } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
                    >
                      <span
                        className={`${
                          darkMode ? "translate-x-6" : "translate-x-1"
                        } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                      />
                    </Switch>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium">Push Notifications</h3>
                      <p className="text-sm text-gray-500">Receive push notifications</p>
                    </div>
                    <Switch
                      checked={notifications}
                      onChange={setNotifications}
                      className={`${
                        notifications ? "bg-blue-600" : "bg-gray-200"
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
                    <h3 className="text-lg font-medium">Profile Information</h3>
                    <motion.div
                      className="space-y-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Display Name
                        </label>
                        <input
                          type="text"
                          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Email
                        </label>
                        <input
                          type="email"
                          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Bio
                        </label>
                        <textarea
                          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
                      <h3 className="text-lg font-medium">Data Sharing</h3>
                      <p className="text-sm text-gray-500">
                        Allow anonymous data collection
                      </p>
                    </div>
                    <Switch
                      checked={dataSharing}
                      onChange={setDataSharing}
                      className={`${
                        dataSharing ? "bg-blue-600" : "bg-gray-200"
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
                      <h3 className="text-lg font-medium">Email Updates</h3>
                      <p className="text-sm text-gray-500">Receive email notifications</p>
                    </div>
                    <Switch
                      checked={emailUpdates}
                      onChange={setEmailUpdates}
                      className={`${
                        emailUpdates ? "bg-blue-600" : "bg-gray-200"
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
                    <h3 className="text-lg font-medium">Advanced Settings</h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Data Export
                      </label>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-4 py-2 mt-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                      >
                        Export All Data
                      </motion.button>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Account Actions
                      </label>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-4 py-2 mt-2 text-red-700 bg-red-100 rounded-lg hover:bg-red-200"
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
                className="w-full px-4 py-2 mt-6 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Save Changes
              </motion.button>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Settings;