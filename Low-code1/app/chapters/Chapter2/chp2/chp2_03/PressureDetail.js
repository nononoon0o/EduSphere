

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PressureDetailScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>1. 기압 (Pressure)</Text>
      <Text style={styles.text}>
        기압은 기체가 일정 공간 내에서 분자들이 충돌하는 힘의 총합을 의미합니다...{"\n\n"}
        - 보일의 법칙과 찰스의 법칙에 따라 기압과 부피, 온도는 서로 밀접한 관계...{"\n\n"}
        기체의 부피 비율:{"\n"}
        - 아보가드로의 법칙은...
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontWeight: 'bold', fontSize: 18, marginBottom: 15 },
  text: { fontSize: 16 },
});

export default PressureDetailScreen;
