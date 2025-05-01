// app/chp1_04/ch1_04_01/TemperatureDetail.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TemperatureDetail = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>온도</Text>
      <Text style={styles.text}>
        온도는 기후에 영향을 미치는 주요 요인 중 하나로, 지역과 시간에 따라 변화합니다.
        태양 복사, 지표면 특성, 해발 고도 등이 온도에 영향을 줍니다.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  text: { fontSize: 16, lineHeight: 24 },
});

export default TemperatureDetail;
