import React, { createContext, useState, useEffect, type ReactNode } from 'react';
import { type ThemeContextType } from '../types';

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDark, setIsDark] = useState<boolean>(false);

  // Initialize theme on mount
  useEffect(() => {
    const initializeTheme = () => {
      const saved = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const shouldBeDark = saved === 'dark' || (!saved && prefersDark);
      
      setIsDark(shouldBeDark);
    };

    initializeTheme();
  }, []);

  // Update DOM when theme changes
  useEffect(() => {
    const root = document.documentElement;
    
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggle = () => {
    setIsDark(prev => !prev);
  };

  const value: ThemeContextType = {
    isDark,
    toggle,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

