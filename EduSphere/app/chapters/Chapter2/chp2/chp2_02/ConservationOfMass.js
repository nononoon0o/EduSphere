import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BackButton from '../../../../../components/BackButton'; // Adjust the path if needed

const ConservationOfMassScreen = () => {
  return (
    <View style={styles.container}>
      {/* Back Button */}
      <BackButton />

      <Text style={styles.title}>1. 질량 보존 법칙 (Law of Conservation of Mass)</Text>
      <Text style={styles.text}>
        질량 보존 법칙은 "화학 반응이 일어날 때, 반응에 참여하는 물질의 질량의 총합은 변하지 않으며, 
        새로운 물질을 형성할 때 그 질량은 일정하게 유지된다"는 원칙입니다. 
        이 법칙은 18세기 프랑스의 화학자 앙투안 라부아지에에 의해 발견되었습니다.{"\n\n"}
        주요 내용:{"\n"}
        - 화학 반응 전후의 질량은 동일{"\n"}
        - 질량의 변화는 화학 반응 내에서만 일어남{"\n"}
        - 실험적 증거{"\n\n"}
        예시: 2H₂ + O₂ → 2H₂O의 의의:{"\n"}
        - 화학 반응 예측 가능성{"\n"}
        - 환경과 안전 관련 적용
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  text: { fontSize: 16 },
});

export default ConservationOfMassScreen;
