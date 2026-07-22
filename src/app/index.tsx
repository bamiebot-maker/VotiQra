import { Redirect } from 'expo-router';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { BrandMark } from '@/components/voter/BrandMark';
import { useAuth } from '@/hooks/useAuth';

export default function EntryScreen() {
  const { loading, session, voter } = useAuth();
  if (loading) return <View style={styles.container}><BrandMark /><ActivityIndicator color="#08A66C" size="large" /><Text style={styles.text}>Verifying your secure access…</Text></View>;
  if (!session) return <Redirect href="/(auth)" />;
  if (!voter) return <Redirect href="/(onboarding)" />;
  return <Redirect href="/(app)" />;
}

const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: '#F7FBF9', alignItems: 'center', justifyContent: 'center', gap: 22 }, text: { color: '#60756E', fontSize: 13 } });
