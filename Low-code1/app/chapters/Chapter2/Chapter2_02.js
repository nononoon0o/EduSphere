import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export const subtitle = "02 질량 보존 법칙, 일정 성분비 법칙";

export default function Chapter2_02() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      {/* 돌아가기 버튼 */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/chapters/Chapter2')}>
        <Ionicons name="chevron-back" size={20} color="#1e3a8a" />
        <Text style={styles.backText}>돌아가기</Text>
      </TouchableOpacity>

      <Text style={styles.subtitle}>{subtitle}</Text>
      <Text style={styles.description}>
        화학 반응에서 질량이 보존되는 원리와, 일정한 비율로 성분이 결합하는 법칙을 배웁니다.
      </Text>

      {/* Content Sections */}
      <Text style={styles.sectionTitle}>1. 질량 보존 법칙 (Law of Conservation of Mass)</Text>
      <Text style={styles.text}>
        질량 보존 법칙은 "화학 반응이 일어날 때, 반응에 참여하는 물질의 질량의 총합은 변하지 않으며, 새로운 물질을 형성할 때 그 질량은 일정하게 유지된다"는 원칙입니다. 
        이 법칙은 18세기 프랑스의 화학자 앙투안 라부아지에에 의해 발견되었습니다.
      </Text>
      <Text style={styles.text}>
        주요 내용:
        {"\n"}- 화학 반응 전후의 질량은 동일
        {"\n"}- 질량의 변화는 화학 반응 내에서만 일어남
        {"\n"}- 실험적 증거
      </Text>
      <Text style={styles.text}>
        예시: 2H₂ + O₂ → 2H₂O
      </Text>
      <Text style={styles.text}>
        의의:
        {"\n"}- 화학 반응 예측 가능성
        {"\n"}- 환경과 안전 관련 적용
      </Text>

      <Text style={styles.sectionTitle}>2. 일정 성분비 법칙 (Law of Definite Proportions)</Text>
      <Text style={styles.text}>
        일정 성분비 법칙은 "화학 물질이 반응하여 새로운 물질을 형성할 때, 각 성분의 비율은 일정하다"는 원칙입니다. 조제프 프루스트에 의해 제안되었습니다.
      </Text>
      <Text style={styles.text}>
        주요 내용:
        {"\n"}- 성분비 일정성
        {"\n"}- 화합물 성분비 고정
      </Text>
      <Text style={styles.text}>
        예시: C + O₂ → CO₂
      </Text>
      <Text style={styles.text}>
        의의:
        {"\n"}- 화학 분석 및 합성 계산
      </Text>

      <Text style={styles.sectionTitle}>화학 반응에서의 예시 및 응용</Text>
      <Text style={styles.text}>
        예시: CH₄ + 2O₂ → CO₂ + 2H₂O
      </Text>
      <Text style={styles.text}>
        배합 비율 계산 등 실용적인 응용
      </Text>

      <Text style={styles.sectionTitle}>결론</Text>
      <Text style={styles.text}>
        - 질량 보존 법칙과 일정 성분비 법칙은 화학 반응의 예측과 이해에 필수적인 개념입니다.
        {"\n"}- 기초 화학뿐 아니라 다양한 분야에서 중요하게 작용합니다.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backText: {
    fontSize: 16,
    marginLeft: 6,
    color: '#1e3a8a',
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: '#34495e',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2980b9',
    marginTop: 20,
  },
  text: {
    fontSize: 16,
    color: '#34495e',
    lineHeight: 24,
    marginTop: 10,
  },
});
