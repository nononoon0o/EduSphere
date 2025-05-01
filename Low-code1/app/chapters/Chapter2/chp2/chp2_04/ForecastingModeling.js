
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ForecastingModelingScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>2. 날씨 변화의 예측과 모델링</Text>
      <Text style={styles.text}>
        기상학자들은 날씨 변화를 예측하기 위해...{"\n\n"}
        수치 예보 모델 (NWP):{"\n"}
        - 대기와 해양의 상태를 수학적으로 모델링{"\n\n"}
        상 위성 (Weather Satellites):{"\n"}
        - 지구의 대기와 표면을 관측
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  text: { fontSize: 16 },
});

export default ForecastingModelingScreen;
