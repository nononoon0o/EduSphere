import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BackButton from '../../../../../components/BackButton'; // Import the BackButton component

const AtmosphereCompositionScreen = () => {
  return (
    <View style={styles.container}>
      {/* Back Button */}
      <BackButton />

      <Text style={styles.title}>1. 지구 대기의 구성</Text>
      <Text style={styles.text}>
        대기는 주로 질소(N₂) 78%, 산소(O₂) 21%, 그리고 이산화탄소(CO₂), 메탄(CH₄), 오존(O₃), 수증기(H₂O) 등
        추적 가스로 이루어져 있습니다.{"\n"}
        - 질소(N₂): 비활성 기체{"\n"}
        - 산소(O₂): 호흡과 연소에 중요{"\n"}
        - 이산화탄소(CO₂): 온실 효과{"\n"}
        - 메탄(CH₄): 강력한 온실가스{"\n"}
        - 수증기(H₂O): 날씨 시스템과 관련
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontWeight: 'bold', fontSize: 18, marginBottom: 15 },
  text: { fontSize: 16 }
});

export default AtmosphereCompositionScreen;
