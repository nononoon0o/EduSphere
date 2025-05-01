import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PressureDetailScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>b. 대기압</Text>
      <Text style={styles.text}>
        대기압은 공기가 가하는 힘으로, 고도와 기상 조건에 따라 달라집니다.
        고기압 지역은 일반적으로 맑고 건조한 날씨와 관련이 있으며,
        저기압 지역은 흐림과 비, 폭풍과 관련이 있습니다.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7EF9F9',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    backgroundColor: '#C1EDED',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  text: {
    fontSize: 16,
    color: '#000',
  },
});

export default PressureDetailScreen;
