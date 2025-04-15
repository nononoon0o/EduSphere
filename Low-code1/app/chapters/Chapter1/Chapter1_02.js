// app/chapters/Chapter1/Chapter1_02.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

export const subtitle = "02. 질량 보존 법칙, 일정 성분비 법칙";

export default function Chapter1_02() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <FontAwesome5 name="balance-scale" size={22} color="#2980b9" style={{ marginRight: 10 }} />
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>

      <Text style={styles.description}>
        화학 반응에서 질량이 보존되는 원리와, 일정한 비율로 성분이 결합하는 법칙을 배웁니다.
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>⚖️ 1. 질량 보존의 법칙</Text>
        <Text style={styles.paragraph}>
          "아무것도 생성되지 않고, 아무것도 사라지지 않으며, 모든 것은 단지 변할 뿐이다." 라는 말은 프랑스 화학자 라부아지에가 설명한 질량 보존의 법칙을 요약합니다. 화학 반응이 일어날 때, 반응물의 총 질량은 생성물의 총 질량과 항상 같습니다.
        </Text>
        <Text style={styles.bullet}>• 원자는 생성되거나 소멸되지 않으며, 배열만 달라집니다.</Text>
        <Text style={styles.bullet}>• 밀폐된 계에서는 질량이 항상 같게 유지됩니다.</Text>
        <Text style={styles.paragraph}>예시: 2H₂ + O₂ → 2H₂O (4g 수소 + 32g 산소 = 36g 물)</Text>
        <Text style={styles.bullet}>• 산업, 실험실 등에서 물질의 반응량 예측에 활용됩니다.</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📊 2. 일정 성분비의 법칙</Text>
        <Text style={styles.paragraph}>
          프랑스 화학자 조제프 프루스트는 하나의 화합물은 언제나 일정한 질량비로 구성된다는 사실을 밝혔습니다. 이는 화합물의 조성은 항상 일정하다는 것을 의미합니다.
        </Text>
        <Text style={styles.bullet}>• 예: H₂O는 수소 2개, 산소 1개의 비율로 이루어짐</Text>
        <Text style={styles.bullet}>• 질량 비로는 수소 11.1%, 산소 88.9%</Text>
        <Text style={styles.bullet}>• 혼합물(예: 소금물)과는 구별됨</Text>
        <Text style={styles.paragraph}>예외: 산화철처럼 다양한 비율로 결합하는 경우는 다중 비례의 법칙으로 설명됩니다.</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔗 3. 두 법칙의 중요성</Text>
        <Text style={styles.paragraph}>이 두 법칙은 현대 화학의 기초를 이루며, 원자론과 결합하여 정량적 사고의 기반이 됩니다.</Text>
        <Text style={styles.bullet}>• 라부아지에: 질량 보존 → 원자는 변하지 않는다.</Text>
        <Text style={styles.bullet}>• 프루스트: 조성 일정 → 화합물은 일정한 구조를 갖는다.</Text>
        <Text style={styles.paragraph}>오늘날의 화학 계산, 반응식 작성, 몰 개념, 비율 계산 등은 모두 이 두 법칙에 기반합니다.</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🧠 결론</Text>
        <Text style={styles.paragraph}>화학을 공부하는 데 있어 질량 보존의 법칙과 일정 성분비의 법칙은 반드시 이해해야 하는 핵심 개념입니다. 이를 통해 우리는 화학 반응을 정확히 예측하고 설명할 수 있습니다.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f9fcff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  description: {
    fontSize: 16,
    color: '#34495e',
    marginBottom: 20,
    lineHeight: 22,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2e86de',
    marginBottom: 8,
  },
  bullet: {
    fontSize: 15,
    marginLeft: 10,
    marginBottom: 6,
    color: '#2c3e50',
  },
  paragraph: {
    fontSize: 15,
    color: '#2c3e50',
    lineHeight: 22,
    marginBottom: 6,
  },
});
