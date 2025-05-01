import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export const subtitle = "02. 질량 보존 법칙, 일정 성분비 법칙";

export default function Chapter1_02_Index() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Back button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={22} color="#fff" />
        <Text style={styles.backText}>돌아가기</Text>
      </TouchableOpacity>

      {/* Subtitle */}
      <Text style={styles.subtitle}>{subtitle}</Text>
      <Text style={styles.description}>
        화학 반응에서 질량이 보존되는 원리와, 일정한 비율로 성분이 결합하는 법칙을 배웁니다.
      </Text>

      {/* Navigation Cards */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push('/chapters/Chapter1/chp1/chp1_02/LawOfConservationOfMass')}
      >
        <Text style={styles.cardText}>⚖ 1. 질량 보존의 법칙</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push('/chapters/Chapter1/chp1/chp1_02/LawOfConstantCompositionRatio')}
      >
        <Text style={styles.cardText}>📊 2. 일정 성분비의 법칙</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push('/chapters/Chapter1/chp1/chp1_02/ImportanceOfTheTwoLaws')}
      >
        <Text style={styles.cardText}>🔗 3. 두 법칙의 중요성</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 20,
    minHeight: '100%',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e3a8a',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 30,
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  backText: {
    fontSize: 16,
    marginLeft: 6,
    color: '#fff',
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 16,
    color: '#157347',
    fontWeight: '700',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#1e1e1e',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#d9e6c3',
    borderRadius: 10,
    paddingVertical: 18,
    paddingHorizontal: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  cardText: {
    fontSize: 16,
    color: '#1f1f1f',
    fontWeight: '500',
  },
});
