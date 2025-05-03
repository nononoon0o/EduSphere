import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EnergyReleaseScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>2. 화학 반응에서의 에너지 출입</Text>
      <Text style={styles.text}>
        화학 반응은 보통 에너지의 변화를 동반하며, 이 에너지는 주로 열 또는 빛의 형태로 전달됩니다.
        화학 반응은 일반적으로 발열 반응(에너지를 방출)과 흡열 반응(에너지를 흡수)으로 분류할 수 있습니다.
        발열 반응은 에너지를 방출하여 주변 환경에 열을 전달하고, 흡열 반응은 에너지를 흡수하여 반응이 진행되도록 합니다.
        예를 들어, 메탄의 연소 반응은 발열 반응에 해당하며, 광합성은 흡열 반응입니다.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontWeight: 'bold', fontSize: 18, marginBottom: 10 },
  text: { fontSize: 16 }
});

export default EnergyReleaseScreen;
