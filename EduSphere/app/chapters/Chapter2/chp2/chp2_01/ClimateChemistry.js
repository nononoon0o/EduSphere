import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BackButton from '../../../../../components/BackButton'; // Adjust the path if needed

const ClimateChemistryScreen = () => {
  return (
    <View style={styles.container}>
      {/* Back Button */}
      <BackButton />

      <Text style={styles.title}>3. 기후 역학에서의 화학 반응</Text>
      <Text style={styles.text}>
        연소 반응{"\n"}
        광합성과 호흡{"\n"}
        해양 흡수 및 탄소 격리
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontWeight: 'bold', fontSize: 18, marginBottom: 15 },
  text: { fontSize: 16 }
});

export default ClimateChemistryScreen;
