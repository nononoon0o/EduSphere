import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';

import styles from '../../../style/ChapterStyle/Chapter2/Chapter2_01Styles';
import BackButton from '../../../components/BackButton'; // ✅ Composant importé

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
        <BackButton onPress={() => router.replace('/chapters/Chapter2')} /> {/* ✅ Reusable */}
      

      <Text style={styles.title}>{t('chapter2_01.title')}</Text>

      {items.map((item, index) => (
        <TouchableOpacity key={index} style={styles.option} onPress={() => router.push(item.path)}>
          <Text style={styles.optionText}>{t(`chapter2_01.menu.${item.key}`)}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default AtmosphereMenuScreen;
