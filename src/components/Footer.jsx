// components/Footer.jsx
import React from "react";
import { motion } from "framer-motion";

const Footer = () => (
  <motion.footer 
    className="p-6 text-center bg-slate-50 border-t border-slate-200"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.2 }}
  >
    <span className="text-slate-600">❤️ Made with love for your heart — </span>
    <span className="font-semibold text-slate-800">DilCare 2025</span>
  </motion.footer>
);

export default Footer;