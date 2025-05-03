import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BackButton from '../../../../../components/BackButton'; // Adjust the path if needed

const ClimateChangeEffectsScreen = () => {
  return (
    <View style={styles.container}>
      {/* Back Button */}
      <BackButton />

      <Text style={styles.title}>6. 기후 변화의 영향</Text>
      <Text style={styles.text}>
        지구 온도 상승{"\n"}
        빙하 융해 및 해수면 상승{"\n"}
        극단적 날씨
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontWeight: 'bold', fontSize: 18, marginBottom: 15 },
  text: { fontSize: 16 }
});

export default ClimateChangeEffectsScreen;
