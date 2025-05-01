import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const WindDetailScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>2. 바람 (Wind)</Text>
      <Text style={styles.text}>
        바람은 대기 중의 기체가 고온에서 저온으로 이동하는 현상입니다...{"\n\n"}
        기압과 바람의 관계:{"\n"}
        - 바람은 기체의 압력 차이에 따라 발생합니다.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontWeight: 'bold', fontSize: 18, marginBottom: 15 },
  text: { fontSize: 16 },
});

export default WindDetailScreen;
