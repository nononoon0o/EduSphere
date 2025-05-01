import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DefiniteProportionsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>2. 일정 성분비 법칙 (Law of Definite Proportions)</Text>
      <Text style={styles.text}>
        일정 성분비 법칙은 "화학 물질이 반응하여 새로운 물질을 형성할 때, 각 성분의 비율은 일정하다"는 원칙입니다. 
        조제프 프루스트에 의해 제안되었습니다.{"\n\n"}
        주요 내용:{"\n"}
        - 성분비 일정성{"\n"}
        - 화합물 성분비 고정{"\n\n"}
        예시: C + O₂ → CO₂{"\n\n"}
        의의:{"\n"}
        - 화학 분석 및 합성{"\n"}
        - 계산화학 반응에서의 예시 및 응용{"\n\n"}
        예시: CH₄ + 2O₂ → CO₂ + 2H₂O{"\n"}
        - 배합 비율 계산 등 실용적인 응용{"\n\n"}
        결론:{"\n"}
        - 질량 보존 법칙과 일정 성분비 법칙은 화학 반응의 예측과 이해에 필수적인 개념입니다.{"\n"}
        - 기초 화학뿐 아니라 다양한 분야에서 중요하게 작용합니다.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  text: { fontSize: 16 },
});

export default DefiniteProportionsScreen;
