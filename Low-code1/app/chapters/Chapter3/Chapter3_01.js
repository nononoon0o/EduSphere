import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { router } from 'expo-router';

const MatterChangeScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Back Navigation */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/chapters/Chapter3')}>
        <Ionicons name="chevron-back" size={22} color="#fff" />
        <Text style={styles.backButtonText}>돌아가기</Text>
      </TouchableOpacity>

      <Text style={styles.subtitle}>03 질량 보존 법칙, 일정 성분비 법칙</Text>
      <Text style={styles.description}>
        화학 반응에서 질량이 보존되는 원리와, 일정한 비율로 성분이 결합하는 법칙을 배웁니다.
      </Text>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push('/chapters/Chapter3/chp3/chp3_02/ChangesInMatterScreen')}
      >
        <Text style={styles.cardText}>1. 질량 보존 법칙 (Law of Conservation of Mass)</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push('/chapters/Chapter3/chp3/chp3_02/ChemicalEquationsScreen')}
      >
        <Text style={styles.cardText}>2. 일정 성분비 법칙 (Law of Definite Proportions)</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#D9FFD9',
  },
  backButton: {
    backgroundColor: '#2E1A83',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 8,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    marginBottom: 20,
    fontSize: 14,
  },
  card: {
    backgroundColor: '#A0B5B9',
    borderRadius: 10,
    padding: 16,
    marginBottom: 15,
  },
  cardText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default MatterChangeScreen;
