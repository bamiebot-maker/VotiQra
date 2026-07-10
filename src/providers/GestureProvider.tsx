import React, { ReactNode } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

interface GestureProviderProps {
  children: ReactNode;
}

export const GestureProvider: React.FC<GestureProviderProps> = ({ children }) => {
  return <GestureHandlerRootView style={{ flex: 1 }}>{children}</GestureHandlerRootView>;
};
