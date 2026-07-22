import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';

type Props = { label: string; onPress: () => void; loading?: boolean; disabled?: boolean; variant?: 'primary' | 'outline' };

export function PrimaryButton({ label, onPress, loading = false, disabled = false, variant = 'primary' }: Props) {
  const inactive = disabled || loading;
  return <Pressable accessibilityRole="button" disabled={inactive} onPress={onPress} style={({ pressed }) => [styles.base, variant === 'outline' && styles.outline, inactive && styles.disabled, pressed && styles.pressed]}>{loading ? <ActivityIndicator color={variant === 'primary' ? '#FFFFFF' : '#08A66C'} /> : <Text style={[styles.label, variant === 'outline' && styles.outlineLabel]}>{label}</Text>}</Pressable>;
}

const styles = StyleSheet.create({
  base: { minHeight: 54, borderRadius: 15, backgroundColor: '#08A66C', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 22 },
  outline: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#BBD9CD' },
  label: { color: '#FFFFFF', fontSize: 15, fontWeight: '800' },
  outlineLabel: { color: '#087A52' },
  disabled: { opacity: 0.55 },
  pressed: { transform: [{ scale: 0.99 }] },
});
