import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

const PressureWindScreen = () => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/chapters/Chapter2')}>
        <Ionicons name="chevron-back" size={22} color="#1e3a8a" />
        <Text style={styles.backText}>Home</Text>
      </TouchableOpacity>

      <Text style={styles.title}>{t('chapter2_03.title')}</Text>
      <Text style={styles.subtitle}>{t('chapter2_03.description')}</Text>

      <TouchableOpacity style={styles.option} onPress={() => router.push('/chapters/Chapter2/chp2/chp2_03/PressureDetail')}>
        <Text style={styles.optionText}>{t('chapter2_03.menu.item1')}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={() => router.push('/chapters/Chapter2/chp2/chp2_03/WindDetail')}>
        <Text style={styles.optionText}>{t('chapter2_03.menu.item2')}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={() => router.push('/chapters/Chapter2/chp2/chp2_03/GasEnergyExchange')}>
        <Text style={styles.optionText}>{t('chapter2_03.menu.item3')}</Text>
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
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
    lineHeight: 20,
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

export default PressureWindScreen;
