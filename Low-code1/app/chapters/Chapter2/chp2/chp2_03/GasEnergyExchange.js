import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const GasEnergyExchangeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>3. 화학 반응에서 기체와 에너지의 교환</Text>
      <Text style={styles.text}>
        기체 반응에서는 기압과 온도가 중요한 역할을 하며...{"\n\n"}
        - 엔탈피 변화는...{"\n"}
        - 연료가 연소할 때 에너지를 예측...{"\n\n"}
        결론: 기압과 바람은 화학 반응과 기체의 행동을 이해하는 데 중요한 역할을 합니다...
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontWeight: 'bold', fontSize: 18, marginBottom: 15 },
  text: { fontSize: 16 },
});

export default GasEnergyExchangeScreen;
