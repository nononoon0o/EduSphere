import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import styles from '../../../style/ChapterStyle/Chapter2/Chapter2_03Styles';

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


export default PressureWindScreen;
