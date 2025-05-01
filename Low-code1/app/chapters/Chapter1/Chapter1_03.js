// app/chapters/Chapter1/Chapter1_03.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Chapter1_03() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Back button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={22} color="#fff" />
        <Text style={styles.backText}>돌아가기</Text>
      </TouchableOpacity>

      {/* Header box */}
      <View style={styles.headerBox}>
        <Text style={styles.headerTitle}>
          03 기체 반응 법칙, 화학 반응에서의 에너지 출입
        </Text>
        <Text style={styles.headerDescription}>
          기체 반응에서의 부피 비율과 화학 반응 중 에너지가 어떻게 주고받는지 알아봅니다.
          이 장에서는 기체 반응에서의 부피 비율과 화학 반응 중 에너지 교환에 대해 깊이 있게 다룹니다.
        </Text>
      </View>

      {[
        { title: '1. 기체 반응에서의 부피 비율', path: '/chapters/Chapter1/chp1/chp1_03/GasReactionRatioScreen' },
        { title: '2. 화학 반응에서의 에너지 출입', path: '/chapters/Chapter1/chp1/chp1_03/EnergyReleaseScreen' },
        { title: '3. 활성화 에너지와 반응 경로', path: '/chapters/Chapter1/chp1/chp1_03/ActivationEnergyScreen' },
        { title: '4. 이상 기체 법칙 및 실제 기체 행동', path: '/chapters/Chapter1/chp1/chp1_03/IdealVsRealGasScreen' },
        { title: '5. 에너지 전달의 화학 반응에서의 역할', path: '/chapters/Chapter1/chp1/chp1_03/EnergyTransferRoleScreen' },
        { title: '6. 촉매와 활성화 에너지', path: '/chapters/Chapter1/chp1/chp1_03/CatalystScreen' },
        { title: '7. 기체 법칙과 에너지 전달의 실용적 적용', path: '/PracticalApplicationScreen' },
      ].map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.card}
          onPress={() => router.push(item.path)}
        >
          <Text style={styles.cardText}>{item.title}</Text>
        </TouchableOpacity>
      ))}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white', // Light green background
    padding: 20,
    paddingBottom: 40,
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
  headerBox: {
    backgroundColor: '#f0f5e1', // White/cream box
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2e2e2e',
    marginBottom: 6,
  },
  headerDescription: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  card: {
    backgroundColor: '#d9e6c3', // Same muted green button
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
    fontSize: 15,
    color: '#1f1f1f',
    fontWeight: '500',
  },
});
