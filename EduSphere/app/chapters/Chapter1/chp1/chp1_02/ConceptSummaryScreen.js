import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function ConceptSummaryScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* 뒤로가기 버튼 */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.push('/chapters/Chapter1/Chapter1_02')}>
        <Ionicons name="arrow-back" size={20} color="#2c3e50" />
        <Text style={styles.backText}>뒤로가기</Text>
      </TouchableOpacity>

      {/* 학습목표 */}
      <Text style={styles.text}>
        📘 학습목표 : 화학 반응을 이해하고, 입자 배열로 화학 반응을 설명할 수 있다.
      </Text>

      {/* 주요개념 */}
      <Text style={styles.text}>
        📚 주요개념 : 물리 변화와 화학 변화의 차이점을 이해할 수 있다.
      </Text>

      {/* 화학반응 설명 */}
      <View style={styles.conceptSection}>
        <Text style={styles.conceptTitle}>🧪 화학 반응</Text>
        <Text style={styles.description}>- 두 가지 이상의 물질이 반응하여 새로운 물질을 만드는 현상.</Text>
        <Text style={styles.description}>- 반응 전과 후의 입자 배열 변화가 일어나며, 물질의 성질이 새롭게 바뀜.</Text>
      </View>

      {/* 화학반응 특징 */}
      <View style={styles.conceptSection}>
        <Text style={styles.conceptTitle}>🧪 화학 반응의 특징</Text>

        <Text style={styles.featureTitle}>🎨 색깔 변화</Text>
        <Text style={styles.description}>- 철이 녹슬면서 갈색(산화철)으로 변함</Text>
        <Text style={styles.description}>- 잎이 가을에 초록색에서 노란색으로 변함</Text>

        <Text style={styles.featureTitle}>💨 기체 발생</Text>
        <Text style={styles.description}>- 식초와 베이킹소다가 반응하여 이산화탄소 발생</Text>
        <Text style={styles.description}>- 철과 염산 반응 시 수소 기체 발생</Text>

        <Text style={styles.featureTitle}>🔥 빛/열 발생</Text>
        <Text style={styles.description}>- 폭죽이 터질 때 빛과 열 발생</Text>
        <Text style={styles.description}>- 촛불이 타면서 빛과 열 방출</Text>

        <Text style={styles.featureTitle}>🧱 고체 생성 (침전)</Text>
        <Text style={styles.description}>- 석회수에 이산화탄소를 통과시키면 탄산칼슘 침전 생성</Text>
        <Text style={styles.description}>- 황산구리 수용액에 철을 넣으면 구리가 침전됨</Text>

        <Text style={styles.featureTitle}>👃 냄새 변화</Text>
        <Text style={styles.description}>- 음식물이 부패할 때 고약한 냄새 발생</Text>
        <Text style={styles.description}>- 양파를 썰 때 톡 쏘는 냄새 발생</Text>
      </View>

      {/* 다음 페이지 버튼 */}
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => router.push('/chapters/Chapter1/chp1/chp1_02/LearnScreen')}
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
    marginBottom: 10,
  },
  conceptSection: {
    marginTop: 30,
  },
  conceptTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2980b9',
    marginBottom: 10,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 15,
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
