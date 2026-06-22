'use client';

import { useEffect, useState } from 'react';

import { ThemeContext } from './ThemeContext';

import type { Theme, ThemeProviderProps } from './types';

import useLocalStorage from '@/hooks/useLocalStorage';

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [persistedSearch, setPersistedSearch] = useLocalStorage('theme', '');
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = persistedSearch as Theme;
    return savedTheme || 'light';
  });

  useEffect(() => {
    setPersistedSearch(theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [setPersistedSearch, theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
