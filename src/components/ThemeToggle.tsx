import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export const ThemeToggle: React.FC = () => {
  const { isDark, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-research-500 focus:ring-offset-2 ${
        isDark 
          ? 'bg-research-600' 
          : 'bg-gray-300 dark:bg-gray-600'
      }`}
      role="switch"
      aria-checked={isDark}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {/* Sliding circle */}
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform duration-300 ${
          isDark ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
      
      {/* Icons */}
      <Sun 
        size={12} 
        className={`absolute left-1 text-yellow-500 transition-opacity duration-300 ${
          isDark ? 'opacity-30' : 'opacity-100'
        }`}
      />
      <Moon 
        size={12} 
        className={`absolute right-1 text-blue-200 transition-opacity duration-300 ${
          isDark ? 'opacity-100' : 'opacity-30'
        }`}
      />
    </button>
  );
};