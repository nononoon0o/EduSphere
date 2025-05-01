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

      <Text style={styles.title}>기권과 지구 기온 (The Atmosphere and Earth's Temperature)</Text>

      <TouchableOpacity style={styles.option} onPress={() => router.push('/chapters/Chapter2/chp2/chp2_01/AtmosphereComposition')}>
        <Text style={styles.optionText}>1. 지구 대기의 구성</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={() => router.push('/chapters/Chapter2/chp2/chp2_01/GreenhouseEffect')}>
        <Text style={styles.optionText}>2. 온실 효과와 지구 온난화</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={() => router.push('/chapters/Chapter2/chp2/chp2_01/ClimateChemistry')}>
        <Text style={styles.optionText}>3. 기후 역학에서의 화학 반응</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={() => router.push('/chapters/Chapter2/chp2/chp2_01/EnergyTransferMechanisms')}>
        <Text style={styles.optionText}>4. 에너지 전송 메커니즘 역할</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={() => router.push('/chapters/Chapter2/chp2/chp2_01/HumanImpactClimate')}>
        <Text style={styles.optionText}>5. 인간의 영향</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={() => router.push('/chapters/Chapter2/chp2/chp2_01/ClimateChangeEffects')}>
        <Text style={styles.optionText}>6. 기후 변화의 영향</Text>
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
