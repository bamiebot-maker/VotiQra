import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import {
  QueryProvider,
  ThemeProvider,
  AuthProvider,
  GestureProvider,
  SafeAreaProviderWrapper,
} from '@/providers';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    // Simulate loading resources
    const initializeApp = async (): Promise<void> => {
      try {
        // Add any initialization logic here
        // For example: load fonts, verify auth token, etc.

        // When done, hide splash screen
        await SplashScreen.hideAsync();
      } catch (error) {
        console.error('Error initializing app:', error);
      }
    };

    initializeApp();
  }, []);

  return (
    <GestureProvider>
      <SafeAreaProviderWrapper>
        <AuthProvider>
          <ThemeProvider>
            <QueryProvider>
              <Stack
                screenOptions={{
                  headerShown: false,
                animation: 'fade',
                }}
              >
                <Stack.Screen name="index" />
                <Stack.Screen name="(auth)" />
                <Stack.Screen name="(onboarding)" />
                <Stack.Screen name="(app)" />
                <Stack.Screen name="(modals)" options={{ presentation: 'modal' }} />
              </Stack>
              <StatusBar style="dark" />
            </QueryProvider>
          </ThemeProvider>
        </AuthProvider>
      </SafeAreaProviderWrapper>
    </GestureProvider>
  );
}
