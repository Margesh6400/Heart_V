// components/Footer.jsx
import React from "react";
import { motion } from "framer-motion";

const Footer = () => (
  <motion.footer 
    className="p-6 text-center border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.2 }}
  >
    <span className="text-slate-600 dark:text-slate-400">❤️ Made with love for your heart — </span>
    <span className="font-semibold text-slate-800 dark:text-slate-200">DilCare 2025</span>
  </motion.footer>
);

export default Footer;