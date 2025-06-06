import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import styles from '../../../style/ChapterStyle/Chapter2/Chapter2_04Styles'; // ✅ Style import
import BackButton from '../../../components/BackButton'; // ✅ Reusable back button

const AtmosphereMenuScreen = () => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* 🔙 Back Navigation */}
      <BackButton onPress={() => router.replace('/chapters/Chapter2')} />

      {/* 🧪 Title and Subtitle */}
      <Text style={styles.title}>{t('chapter2_04.title')}</Text>
      <Text style={styles.subtitle}>{t('chapter2_04.description')}</Text>

      {/* 📚 Menu Options */}
      <TouchableOpacity
        style={styles.option}
        onPress={() => router.push('/chapters/Chapter2/chp2/chp2_04/ScientificPrinciples')}
      >
        <Text style={styles.optionText}>{t('chapter2_04.menu.item1')}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.option}
        onPress={() => router.push('/chapters/Chapter2/chp2/chp2_04/ForecastingModeling')}
      >
        <Text style={styles.optionText}>{t('chapter2_04.menu.item2')}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.option}
        onPress={() => router.push('/chapters/Chapter2/chp2/chp2_04/WeatherImpact')}
      >
        <Text style={styles.optionText}>{t('chapter2_04.menu.item3')}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AtmosphereMenuScreen;
