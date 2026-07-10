import { Text, View } from 'react-native';
import { Link } from 'expo-router';

export default function HomeScreen(): JSX.Element {
  return (
    <View className="flex-1 items-center justify-center bg-gradient-to-b from-primary-50 to-primary-100">
      <View className="gap-4">
        <Text className="text-3xl font-bold text-primary-900">VotiQra ✔️</Text>
        <Text className="text-center text-lg text-primary-700">
          Election Management Platform
        </Text>

        <View className="mt-8 gap-2">
          <Link href="/(auth)" asChild>
            <Text className="rounded-lg bg-primary-500 p-4 text-center font-semibold text-white">
              Go to Auth
            </Text>
          </Link>
          <Link href="/(onboarding)" asChild>
            <Text className="rounded-lg bg-secondary-500 p-4 text-center font-semibold text-white">
              Go to Onboarding
            </Text>
          </Link>
          <Link href="/(app)" asChild>
            <Text className="rounded-lg bg-success-500 p-4 text-center font-semibold text-white">
              Go to App
            </Text>
          </Link>
        </View>
      </View>
    </View>
  );
}
