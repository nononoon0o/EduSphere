import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';

export default function Chapter1_03() {
  const router = useRouter();
  const { t } = useTranslation();

  const paths = [
    { key: 'item1', path: '/chapters/Chapter1/chp1/chp1_03/GasReactionRatioScreen' },
    { key: 'item2', path: '/chapters/Chapter1/chp1/chp1_03/EnergyReleaseScreen' },
    { key: 'item3', path: '/chapters/Chapter1/chp1/chp1_03/ActivationEnergyScreen' },
    { key: 'item4', path: '/chapters/Chapter1/chp1/chp1_03/IdealVsRealGasScreen' },
    { key: 'item5', path: '/chapters/Chapter1/chp1/chp1_03/EnergyTransferRoleScreen' },
    { key: 'item6', path: '/chapters/Chapter1/chp1/chp1_03/CatalystScreen' },
    { key: 'item7', path: '/chapters/Chapter1/chp1/chp1_03/PracticalApplicationScreen' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Back button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={22} color="#fff" />
        <Text style={styles.backText}>Home</Text>
      </TouchableOpacity>

      {/* Header box */}
      <View style={styles.headerBox}>
        <Text style={styles.headerTitle}>{t('chapter1_03.title')}</Text>
        <Text style={styles.headerDescription}>{t('chapter1_03.description')}</Text>
      </View>

      {/* Navigation Cards */}
      {paths.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.card}
          onPress={() => router.push(item.path)}
        >
          <Text style={styles.cardText}>{t(`chapter1_03.cards.${item.key}`)}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
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
    backgroundColor: '#f0f5e1',
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
    fontSize: 15,
    color: '#1f1f1f',
    fontWeight: '500',
  },
});
