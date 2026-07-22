import { Text, View, StyleSheet } from 'react-native';

export function BrandMark({ light = false }: { light?: boolean }) {
  return <View style={styles.row}><View style={styles.mark}><Text style={styles.check}>✓</Text></View><Text style={[styles.name, light && styles.light]}>votiqra</Text></View>;
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  mark: { width: 38, height: 38, borderRadius: 12, backgroundColor: '#08A66C', alignItems: 'center', justifyContent: 'center', transform: [{ rotate: '-8deg' }] },
  check: { color: '#FFFFFF', fontSize: 22, fontWeight: '900' },
  name: { color: '#10251F', fontSize: 25, fontWeight: '800', letterSpacing: -1 },
  light: { color: '#FFFFFF' },
});
