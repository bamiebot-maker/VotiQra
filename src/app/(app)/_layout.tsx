import { Stack } from 'expo-router';

export default function AppLayout(): JSX.Element {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}
