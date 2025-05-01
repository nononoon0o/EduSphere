import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ForecastingModelScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>3. 기상 예측과 기후 모델</Text>
      <Text style={styles.text}>
        기상 예측은 실시간 기상 관측(위성, 레이더)과 복잡한 컴퓨터 모델을 기반으로 합니다.
        이러한 모델은 대기의 변화를 시뮬레이션하여 단기 및 장기 날씨를 예측합니다.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 15,
  },
  text: {
    fontSize: 16,
    color: '#000',
  },
});

export default ForecastingModelScreen;
