import React from 'react';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import styles from '../../../style/ChapterStyle/Chapter3/Chapter3_02Styles';
import BackButton from '../../../components/BackButton';

export default function Chapter3_02() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <BackButton onPress={() => router.replace('/chapters/Chapter3')} />

      <Text style={styles.title}>{t('chapter3_02.title')}</Text>
      <Text style={styles.content}>{t('chapter3_02.description')}</Text>
    </View>
  );
}
