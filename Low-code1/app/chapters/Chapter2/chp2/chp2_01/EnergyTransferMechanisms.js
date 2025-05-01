import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EnergyTransferMechanismsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>4. 에너지 전송 메커니즘</Text>
      <Text style={styles.text}>
        전도{"\n"}
        대류{"\n"}
        복사
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontWeight: 'bold', fontSize: 18, marginBottom: 15 },
  text: { fontSize: 16 }
});

export default EnergyTransferMechanismsScreen;
