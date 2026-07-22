import React, { ReactNode, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { useThemeStore } from '@/store/theme';

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const { theme } = useThemeStore();
  const [_isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (theme === 'system') {
      setIsDark(systemColorScheme === 'dark');
    } else {
      setIsDark(theme === 'dark');
    }
  }, [theme, systemColorScheme]);

  // Theme configuration can be passed via context or props
  // This is a placeholder for future theme switching logic

  return <>{children}</>;
};
