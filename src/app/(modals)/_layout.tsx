import { Stack } from 'expo-router';

export default function ModalsLayout(): JSX.Element {
  return (
    <Stack
      screenOptions={{
        presentation: 'modal',
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}
