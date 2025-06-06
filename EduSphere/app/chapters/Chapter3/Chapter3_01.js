import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { router } from 'expo-router';
import styles from '../../../style/ChapterStyle/Chapter3/Chapter3_01Styles';
import BackButton from '../../../components/BackButton';

const MatterChangeScreen = () => {
  const { t } = useTranslation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <BackButton onPress={() => router.replace('/chapters/Chapter3')} />

      <Text style={styles.subtitle}>{t('chapter3_01.title')}</Text>
      <Text style={styles.description}>{t('chapter3_01.description')}</Text>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push('/chapters/Chapter3/chp3/chp3_01/ChangesInMatterScreen')}
      >
        <Text style={styles.cardText}>{t('chapter3_01.menu.item1')}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push('/chapters/Chapter3/chp3/chp3_02/ChemicalEquationsScreen')}
      >
        <Text style={styles.cardText}>{t('chapter3_01.menu.item2')}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default MatterChangeScreen;
