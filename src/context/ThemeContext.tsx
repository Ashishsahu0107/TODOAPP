import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import { useColorScheme as useDeviceColorScheme } from 'react-native';
import { ThemeMode } from '@/types/todo';
import { ThemeColors, lightColors, darkColors } from '@/constants/theme';
import { loadStoredTheme, saveStoredTheme } from '@/utils/storage';

interface ThemeContextValue {
  themeMode: ThemeMode;
  isDark: boolean;
  colors: ThemeColors;
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const deviceColorScheme = useDeviceColorScheme();
  const [themeMode, setThemeModeState] = useState<ThemeMode>('system');

  useEffect(() => {
    loadStoredTheme().then((saved) => {
      setThemeModeState(saved);
    });
  }, []);

  const setThemeMode = useCallback((mode: ThemeMode) => {
    setThemeModeState(mode);
    saveStoredTheme(mode);
  }, []);

  const isDark = useMemo(() => {
    if (themeMode === 'system') {
      return deviceColorScheme === 'dark';
    }
    return themeMode === 'dark';
  }, [themeMode, deviceColorScheme]);

  const toggleTheme = useCallback(() => {
    setThemeModeState((prev) => {
      const currentDark = prev === 'system' ? deviceColorScheme === 'dark' : prev === 'dark';
      const nextMode: ThemeMode = currentDark ? 'light' : 'dark';
      saveStoredTheme(nextMode);
      return nextMode;
    });
  }, [deviceColorScheme]);

  const colors = useMemo(() => {
    return isDark ? darkColors : lightColors;
  }, [isDark]);

  const value = useMemo(
    () => ({
      themeMode,
      isDark,
      colors,
      setThemeMode,
      toggleTheme,
    }),
    [themeMode, isDark, colors, setThemeMode, toggleTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export function useAppTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useAppTheme must be used within a ThemeContextProvider');
  }
  return context;
}
