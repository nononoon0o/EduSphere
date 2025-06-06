import React from 'react';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import styles from '../../../style/ChapterStyle/Chapter4/Chapter4_02Styles';
import BackButton from '../../../components/BackButton';

export default function Chapter4_02() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <BackButton onPress={() => router.replace('/chapters/Chapter4')} />
      <Text style={styles.subtitle}>{t('chapter4_02.title')}</Text>
      <Text style={styles.content}>{t('chapter4_02.description')}</Text>
    </View>
  );
}
