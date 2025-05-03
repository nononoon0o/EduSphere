import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

const AtmosphereMenuScreen = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const items = [
    { key: 'item1', path: '/chapters/Chapter2/chp2/chp2_01/AtmosphereComposition' },
    { key: 'item2', path: '/chapters/Chapter2/chp2/chp2_01/GreenhouseEffect' },
    { key: 'item3', path: '/chapters/Chapter2/chp2/chp2_01/ClimateChemistry' },
    { key: 'item4', path: '/chapters/Chapter2/chp2/chp2_01/EnergyTransferMechanisms' },
    { key: 'item5', path: '/chapters/Chapter2/chp2/chp2_01/HumanImpactClimate' },
    { key: 'item6', path: '/chapters/Chapter2/chp2/chp2_01/ClimateChangeEffects' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Back Navigation */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/chapters/Chapter2')}>
        <Ionicons name="chevron-back" size={22} color="#1e3a8a" />
        <Text style={styles.backText}>Home</Text>
      </TouchableOpacity>

      <Text style={styles.title}>{t('chapter2_01.title')}</Text>

      {items.map((item, index) => (
        <TouchableOpacity key={index} style={styles.option} onPress={() => router.push(item.path)}>
          <Text style={styles.optionText}>{t(`chapter2_01.menu.${item.key}`)}</Text>
        </TouchableOpacity>
      ))}
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
