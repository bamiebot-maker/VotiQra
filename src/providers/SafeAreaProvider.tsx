import React, { ReactNode } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

interface SafeAreaProviderWrapperProps {
  children: ReactNode;
}

export const SafeAreaProviderWrapper: React.FC<SafeAreaProviderWrapperProps> = ({
  children,
}) => {
  return <SafeAreaProvider>{children}</SafeAreaProvider>;
};
