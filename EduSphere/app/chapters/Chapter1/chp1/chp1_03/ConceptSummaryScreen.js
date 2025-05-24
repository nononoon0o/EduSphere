import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function ConceptSummaryScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* 뒤로가기 버튼 */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.push('/chapters/Chapter1/Chapter1_03')}>
        <Ionicons name="arrow-back" size={20} color="#2c3e50" />
        <Text style={styles.backText}>뒤로가기</Text>
      </TouchableOpacity>

      {/* 학습 목표 */}
      <Text style={styles.text}>
        📘 학습목표 : 화학 반응을 화학 반응식으로 표현할 수 있다.
      </Text>

      {/* 주요 개념 섹션 */}
      <View style={styles.conceptSection}>
        {/* 화학 반응식 */}
        <Text style={styles.conceptTitle}>⚗️ 화학 반응식</Text>

        <Text style={styles.itemTitle}>정의 :</Text>
        <Text style={styles.description}>
          화학 반응이 일어날 때, 반응하는 물질과 생성되는 물질을 기호와 수식으로 간단하게 나타낸 식입니다.
        </Text>

        <Text style={styles.itemTitle}>구성 요소 :</Text>
        <Text style={styles.description}>- 반응물(Reactants): 반응하기 전의 물질 (화학 반응식의 왼쪽에 위치)</Text>
        <Text style={styles.description}>- 생성물(Products): 반응한 뒤에 생성된 물질 (화학 반응식의 오른쪽에 위치)</Text>

        <Text style={styles.itemTitle}>예시 :</Text>
        <Text style={styles.description}>2H₂ + 1O₂ → 2H₂O</Text>

        {/* 화학 변화 */}
        <Text style={styles.conceptTitle}>🔢 화학변화</Text>

        <Text style={styles.itemTitle}>정의 :</Text>
        <Text style={styles.description}>
          화학 반응식에서 물질 앞에 붙는 숫자로, 입자의 수(개수)를 나타냅니다.
        </Text>

        <Text style={styles.itemTitle}>역할 :</Text>
        <Text style={styles.description}>
          화학 반응이 일어날 때, 반응 전과 후의 원자 수를 같게 만들어 줍니다. (질량 보존의 법칙)
        </Text>

        <Text style={styles.itemTitle}>주의할 점 :</Text>
        <Text style={styles.description}>
          화학식 자체(원자나 분자 내부)는 절대 바꾸지 않고, 앞에 있는 숫자(계수)만 조정합니다.
        </Text>

        <Text style={styles.itemTitle}>예시 :</Text>
        <Text style={styles.description}>2H₂ + 1O₂ → 2H₂O</Text>
        <Text style={styles.description}>- 수소 분자(H₂)는 2개</Text>
        <Text style={styles.description}>- 산소 분자(O₂)는 1개가 반응해서</Text>
        <Text style={styles.description}>- 물 분자(H₂O) 2개가 생성됨</Text>
      </View>
      {/* 다음 페이지 버튼 */}
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => router.push('/chapters/Chapter1/chp1/chp1_03/LearnScreen')}
      >
        <Ionicons name="arrow-forward" size={24} color="#fff" />
        <View style={styles.nextButtonCircle}>
          <Text style={styles.nextButtonText}>다음</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#f9fcff',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  backText: {
    fontSize: 16,
    marginLeft: 6,
    color: '#2c3e50',
    fontWeight: '500',
  },
  text: {
    fontSize: 20,
    color: '#2c3e50',
    fontWeight: '600',
    marginBottom: 20,
  },
  conceptSection: {
    marginTop: 20,
  },
  conceptTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2980b9',
    marginBottom: 10,
    marginTop: 20,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
    color: '#34495e',
  },
  description: {
    fontSize: 15,
    color: '#555',
    marginLeft: 10,
    marginTop: 5,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 200,
    height: 50,
    backgroundColor: '#3498db',
    borderRadius: 25,
    paddingHorizontal: 16,
    marginTop: 30,
  },
  nextButtonCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3498db',
  },
});
