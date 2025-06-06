import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import styles from '../../../style/ChapterStyle/Chapter2/Chapter2_02Styles';
import BackButton from '../../../components/BackButton'; // ✅ Import reusable BackButton

const ConservationMenuScreen = () => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
       <BackButton onPress={() => router.replace('/chapters/Chapter2')} /> {/* ✅ Reusable */}
      

      <Text style={styles.title}>{t('chapter2_02.title')}</Text>
      <Text style={styles.subtitle}>{t('chapter2_02.description')}</Text>

      <TouchableOpacity
        style={styles.option}
        onPress={() => router.push('/chapters/Chapter2/chp2/chp2_02/ConservationOfMass')}
      >
        <Text style={styles.optionText}>{t('chapter2_02.menu.item1')}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.option}
        onPress={() => router.push('/chapters/Chapter2/chp2/chp2_02/DefiniteProportions')}
      >
        <Text style={styles.optionText}>{t('chapter2_02.menu.item2')}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ConservationMenuScreen;
