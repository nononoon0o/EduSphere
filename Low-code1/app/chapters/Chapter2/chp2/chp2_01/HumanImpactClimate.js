import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HumanImpactClimateScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>5. 인간의 영향</Text>
      <Text style={styles.text}>
        화석 연료 연소{"\n"}
        산림 벌채{"\n"}
        농업 및 가축
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontWeight: 'bold', fontSize: 18, marginBottom: 15 },
  text: { fontSize: 16 }
});

export default HumanImpactClimateScreen;
