import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HumidityDetailScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>c. 습도 및 강수량</Text>
      <Text style={styles.text}>
        공기의 습도는 대기 중의 수증기 양을 의미합니다. 습도가 높을수록 강수가 발생할 가능성이 높아집니다.
        기온이 상승하면 수증기 응결이 발생하고, 이는 구름을 형성하여 강수를 유발할 수 있습니다.
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

export default HumidityDetailScreen;
