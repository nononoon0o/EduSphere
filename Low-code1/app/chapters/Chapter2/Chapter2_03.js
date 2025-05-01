import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const AtmosphereMenuScreen = () => {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Back Navigation */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/chapters/Chapter1')}>
        <Ionicons name="chevron-back" size={22} color="#1e3a8a" />
        <Text style={styles.backText}>돌아가기</Text>
      </TouchableOpacity>

      <Text style={styles.title}>03 기압과 바람</Text>
      <Text style={styles.subtitle}>기체 반응에서의 부피 비율과 화학 반응 중 에너지가 어떻게 주고받는지 알아봅니다.
      </Text>


      <TouchableOpacity style={styles.option} onPress={() => router.push('/chapters/Chapter2/chp2/chp2_03/PressureDetail')}>
        <Text style={styles.optionText}>1. 기압 (Pressure)</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={() => router.push('/chapters/Chapter2/chp2/chp2_03/WindDetail')}>
        <Text style={styles.optionText}>2. 바람 (Wind)</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={() => router.push('/chapters/Chapter2/chp2/chp2_03/GasEnergyExchange')}>
        <Text style={styles.optionText}>3. 화학 반응에서 기체와 에너지의 교환</Text>
      </TouchableOpacity>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#B5D6F0',
    padding: 20,
    justifyContent: 'center',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 30,
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  backText: {
    fontSize: 16,
    marginLeft: 6,
    color: '#1e3a8a',
    fontWeight: '600',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  option: {
    backgroundColor: '#98A5A8',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  optionText: {
    fontSize: 16,
    color: '#000',
  },
});

export default AtmosphereMenuScreen;
