import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const GreenhouseEffectScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>2. 온실 효과와 지구 온난화</Text>
      <Text style={styles.text}>
        온실 가스들이 열을 흡수하고 방출하여 지구를 따뜻하게 만듭니다.
        태양 에너지 흡수 → 적외선 복사 차단 → 강화된 온실 효과
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontWeight: 'bold', fontSize: 18, marginBottom: 15 },
  text: { fontSize: 16 }
});

export default GreenhouseEffectScreen;

