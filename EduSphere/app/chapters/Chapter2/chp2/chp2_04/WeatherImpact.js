import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BackButton from '../../../../../components/BackButton'; // Adjust the path if needed

const WeatherImpactScreen = () => {
  return (
    <View style={styles.container}>
      {/* Back Button */}
      <BackButton />

      <Text style={styles.title}>3. 날씨 변화가 인간과 환경에 미치는 영향</Text>
      <Text style={styles.text}>
        날씨 변화는 인간 사회와 자연 환경에 많은 영향을 미칩니다.{"\n\n"}
        농업: 작물 생산에 큰 영향{"\n"}
        교통: 교통 시스템에 영향{"\n"}
        재난 관리: 기후 변화로 인한 자연 재해{"\n"}
        기후: 장기적인 날씨의 변화{"\n"}
        결론: 날씨의 변화는 자연현상에서 중요한 역할
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  text: { fontSize: 16 },
});

export default WeatherImpactScreen;
