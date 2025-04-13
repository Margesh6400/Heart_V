import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Initialize from localStorage if available
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      return settings.appearance?.theme || 'light';
    }
    return 'light';
  });

  useEffect(() => {
    // Apply theme on mount and when theme changes
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const applyTheme = (newTheme) => {
    setTheme(newTheme);
    
    // Update localStorage
    const savedSettings = localStorage.getItem('userSettings');
    const settings = savedSettings ? JSON.parse(savedSettings) : {};
    settings.appearance = { ...settings.appearance, theme: newTheme };
    localStorage.setItem('userSettings', JSON.stringify(settings));
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, applyTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};