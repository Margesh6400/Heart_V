// pages/DailyCheckIn.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Select = ({ name, value, onChange, placeholder, options }) => (
  <motion.div 
    className="relative"
    whileHover={{ scale: 1.01 }} 
    whileTap={{ scale: 0.99 }}
  >
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-4 transition-all border shadow-sm rounded-xl text-slate-700 bg-white/50 backdrop-blur-sm border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent hover:bg-white/80"
    >
      <option value="">{placeholder}</option>
      {options.map(({ value, label }) => (
        <option key={value} value={value}>{label}</option>
      ))}
    </select>
  </motion.div>
);

const Section = ({ title, children, icon }) => (
  <motion.div
    className="p-6 mb-6 transition-shadow duration-300 border shadow-lg bg-white/70 backdrop-blur-md rounded-2xl border-slate-100/50 hover:shadow-xl"
    whileHover={{ y: -2, scale: 1.01 }}
    transition={{ duration: 0.2 }}
  >
    <motion.h3 
      className="flex items-center mb-6 text-xl font-semibold text-slate-700"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
    >
      <motion.span 
        className="p-2 mr-3 text-3xl rounded-lg bg-slate-100/50"
        whileHover={{ rotate: [0, -10, 10, -10, 0] }}
        transition={{ duration: 0.5 }}
      >
        {icon}
      </motion.span>
      {title}
    </motion.h3>
    <div className="space-y-5">
      {children}
    </div>
  </motion.div>
);

const ProgressIndicator = ({ completed }) => (
  <motion.div className="p-4 mb-8 border bg-white/50 backdrop-blur-sm rounded-2xl border-slate-100/50">
    <div className="flex items-center justify-between mb-2">
      <span className="text-sm font-medium text-slate-600">Progress</span>
      <span className="text-sm font-semibold text-slate-700">{Math.round(completed)}%</span>
    </div>
    <div className="w-full h-3 overflow-hidden rounded-full bg-slate-100">
      <motion.div 
        className="h-full bg-gradient-to-r from-green-400 to-emerald-500"
        initial={{ width: 0 }}
        animate={{ width: `${completed}%` }}
        transition={{ duration: 0.5 }}
      />
    </div>
  </motion.div>
);

const SuccessOverlay = () => (
  <motion.div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <motion.div
      className="p-8 text-center bg-white rounded-3xl"
      initial={{ scale: 0.8, y: 20 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ scale: 0.8, y: 20 }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 1] }}
        transition={{ duration: 0.5 }}
        className="mb-4 text-6xl"
      >
        ✨
      </motion.div>
      <h3 className="mb-2 text-2xl font-bold text-slate-800">Great Job!</h3>
      <p className="text-slate-600">Your daily check-in has been recorded</p>
    </motion.div>
  </motion.div>
);

const LoadingOverlay = () => (
  <motion.div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <motion.div
      className="p-8 text-center bg-white rounded-3xl"
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0.8 }}
    >
      <motion.div
        animate={{ 
          rotate: 360,
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          rotate: { duration: 1.5, repeat: Infinity, ease: "linear" },
          scale: { duration: 1, repeat: Infinity }
        }}
        className="mb-4 text-4xl"
      >
        🌟
      </motion.div>
      <p className="text-slate-600">Saving your progress...</p>
    </motion.div>
  </motion.div>
);

const DailyCheckIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    water: "",
    eating: "",
    oil: "",
    skippedMeals: "",
    exercise: "",
    sitting: "",
    smoke: "",
    alcohol: "",
    mood: "",
    meditation: "",
    sleep: "",
    screenTime: ""
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setLoading(false);
      setShowSuccess(true);
      
      // Confetti effect
      Array(20).fill().forEach((_, i) => {
        createConfetti(i);
      });

      // Wait for success animation then redirect
      setTimeout(() => {
        navigate('/daily-report', { 
          state: { formData } 
        });
      }, 2000);

    } catch (error) {
      setLoading(false);
      console.error('Submission failed:', error);
    }
  };

  const createConfetti = (i) => {
    const confetti = document.createElement('div');
    confetti.className = 'absolute w-2 h-2 rounded-full pointer-events-none';
    confetti.style.backgroundColor = ['#10B981', '#6366F1', '#F59E0B'][Math.floor(Math.random() * 3)];
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.top = '50vh';
    document.body.appendChild(confetti);

    const animation = confetti.animate([
      { transform: 'translate(0, 0) rotate(0deg)', opacity: 1 },
      { transform: `translate(${Math.random() * 200 - 100}px, ${-Math.random() * 500}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
    ], {
      duration: 1000 + Math.random() * 1000,
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    });

    animation.onfinish = () => confetti.remove();
  };

  const getProgress = () => {
    const filled = Object.values(formData).filter(value => value !== "").length;
    return (filled / Object.keys(formData).length) * 100;
  };

  return (
    <motion.div
      className="min-h-screen p-8 bg-gradient-to-br from-slate-50 to-slate-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-5xl mx-auto">
        <motion.div 
          className="mb-8 text-center"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
        >
          <h2 className="text-4xl font-bold text-transparent bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text">
            Daily Check-In
          </h2>
          <p className="mt-2 text-slate-600">Track your daily wellness journey</p>
        </motion.div>

        <ProgressIndicator completed={getProgress()} />
        
        <div className="grid gap-6 md:grid-cols-2">
          <Section title="Food & Water" icon="🍽️">
            <Select
              name="water"
              value={formData.water}
              onChange={handleChange}
              placeholder="💧 Kitne glass paani piya aaj?"
              options={[
                { value: "veryLow", label: "< 6 glass (Very low)" },
                { value: "minimum", label: "6-8 glass (Minimum okay)" },
                { value: "good", label: "8-10 glass (Good)" },
                { value: "excellent", label: "10+ glass (Excellent)" }
              ]}
            />
            <Select
              name="eating"
              value={formData.eating}
              onChange={handleChange}
              placeholder="🍱 Aaj ka khana kaisa tha?"
              options={[
                { value: "healthy", label: "Only ghar ka healthy food" },
                { value: "mixed", label: "Mix of healthy + junk" },
                { value: "unhealthy", label: "Mostly junk / oily / fried" }
              ]}
            />
            <Select
              name="oil"
              value={formData.oil}
              onChange={handleChange}
              placeholder="🛢️ Tel ka istemal?"
              options={[
                { value: "light", label: "Light oil / Steamed / Roasted" },
                { value: "medium", label: "Medium oil" },
                { value: "heavy", label: "Heavy oil / Fried / Ghee" }
              ]}
            />
            <Select
              name="skippedMeals"
              value={formData.skippedMeals}
              onChange={handleChange}
              placeholder="🍴 Kya aaj koi meal skip kiya?"
              options={[
                { value: "none", label: "No, sab timely khaya" },
                { value: "one", label: "1 meal skip kiya" },
                { value: "multiple", label: "Zyada meals skip kiya" }
              ]}
            />
          </Section>

          <Section title="Physical Activity" icon="🏃‍♀️">
            <Select
              name="exercise"
              value={formData.exercise}
              onChange={handleChange}
              placeholder="🏃 Exercise hua?"
              options={[
                { value: "full", label: "30+ mins (walk, run, gym)" },
                { value: "medium", label: "10-30 mins" },
                { value: "light", label: "Sirf stretching / yoga" },
                { value: "none", label: "Bilkul nahi hua" }
              ]}
            />
            <Select
              name="sitting"
              value={formData.sitting}
              onChange={handleChange}
              placeholder="⏱️ Kitne time tak continuously baitha/baithi raha aaj?"
              options={[
                { value: "less2", label: "< 2 hours" },
                { value: "2to4", label: "2-4 hours" },
                { value: "more4", label: "4+ hours (long sitting)" }
              ]}
            />
          </Section>

          <Section title="Habits" icon="🚬">
            <Select
              name="smoke"
              value={formData.smoke}
              onChange={handleChange}
              placeholder="🚬 Cigarette piya aaj?"
              options={[
                { value: "yes", label: "Haan" },
                { value: "no", label: "Nahi" }
              ]}
            />
            <Select
              name="alcohol"
              value={formData.alcohol}
              onChange={handleChange}
              placeholder="🍷 Alcohol liya aaj?"
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" }
              ]}
            />
          </Section>

          <Section title="Mental Wellness" icon="🧠">
            <Select
              name="mood"
              value={formData.mood}
              onChange={handleChange}
              placeholder="😵‍💫 Aaj ka mood?"
              options={[
                { value: "happy", label: "Happy & Energized" },
                { value: "okay", label: "Okay / Normal" },
                { value: "stressed", label: "Stressed / Irritable" },
                { value: "sad", label: "Sad / Low" }
              ]}
            />
            <Select
              name="meditation"
              value={formData.meditation}
              onChange={handleChange}
              placeholder="🧘‍♂️ Kya aaj kuch relaxation ya meditation kiya?"
              options={[
                { value: "good", label: "Haan, 10+ minutes" },
                { value: "little", label: "Thoda kiya" },
                { value: "none", label: "Nahi kiya" }
              ]}
            />
          </Section>

          <Section title="Sleep & Recovery" icon="😴">
            <Select
              name="sleep"
              value={formData.sleep}
              onChange={handleChange}
              placeholder="😴 Kal raat ki neend kaise thi?"
              options={[
                { value: "good", label: "7-8 hrs, achhi neend" },
                { value: "okay", label: "5-6 hrs, thik thak" },
                { value: "poor", label: "< 5 hrs, poor sleep" },
                { value: "disturbed", label: "Nahi ya disturbed sleep" }
              ]}
            />
            <Select
              name="screenTime"
              value={formData.screenTime}
              onChange={handleChange}
              placeholder="📱 Kya bedtime screen-time zyada tha?"
              options={[
                { value: "low", label: "Nahi, 30 mins se kam" },
                { value: "medium", label: "30-60 mins" },
                { value: "high", label: "1+ hour" }
              ]}
            />
          </Section>
        </div>

        <motion.button
          onClick={handleSubmit}
          className="relative w-full px-8 py-4 mt-8 overflow-hidden text-lg font-semibold text-white transition-all shadow-lg rounded-2xl bg-gradient-to-r from-slate-700 to-slate-900 hover:from-slate-600 hover:to-slate-800 hover:shadow-xl"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.span 
            className="absolute inset-0 opacity-0 bg-gradient-to-r from-emerald-400 to-sky-500"
            whileHover={{ opacity: 0.2 }}
          />
          <motion.div
            className="relative flex items-center justify-center space-x-2"
            whileHover={{ y: [-1, 1] }}
            transition={{ repeat: Infinity, repeatType: "reverse", duration: 0.3 }}
          >
            <span>Submit Daily Check-In</span>
            <motion.span 
              animate={{ 
                x: [0, 5, 0],
                scale: [1, 1.2, 1],
              }} 
              transition={{ 
                repeat: Infinity, 
                duration: 1.5,
                times: [0, 0.5, 1]
              }}
            >
              →
            </motion.span>
          </motion.div>
        </motion.button>

        <AnimatePresence>
          {loading && <LoadingOverlay />}
          {showSuccess && <SuccessOverlay />}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default DailyCheckIn;