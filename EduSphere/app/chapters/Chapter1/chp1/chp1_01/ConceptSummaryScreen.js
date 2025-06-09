import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../../../../style/ChapterStyle/Chapter1/ch1Style/interactiveStyles';
import BackButton from '../../../../../components/BackButton';
import { useTranslation } from 'react-i18next';
import NextButton from '../../../../../components/NextButton';

export default function ConceptSummaryScreen() {
  const router = useRouter();
  const { t } = useTranslation();

  const physical = t('conceptSummary.physicalChange', { returnObjects: true });
  const chemical = t('conceptSummary.chemicalChange', { returnObjects: true });

  return (
    <View style={styles.container}>
      <BackButton onPress={() => router.replace('/chapters/Chapter1/Chapter1_01')} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Text style={styles.text}>{t('conceptSummary.learningGoal')}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.conceptTitle}>{physical.title}</Text>
          <Text style={styles.itemTitle}>{t('conceptSummary.features')}</Text>
          {physical.features.map((f, i) => (
            <Text key={`p-f-${i}`} style={styles.description}>{f}</Text>
          ))}
          <Text style={styles.itemTitle}>{t('conceptSummary.examples')}</Text>
          {physical.examples.map((e, i) => (
            <Text key={`p-e-${i}`} style={styles.description}>{e}</Text>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.conceptTitle}>{chemical.title}</Text>
          <Text style={styles.itemTitle}>{t('conceptSummary.features')}</Text>
          {chemical.features.map((f, i) => (
            <Text key={`c-f-${i}`} style={styles.description}>{f}</Text>
          ))}
          <Text style={styles.itemTitle}>{t('conceptSummary.examples')}</Text>
          {chemical.examples.map((e, i) => (
            <Text key={`c-e-${i}`} style={styles.description}>{e}</Text>
          ))}
        </View>

        {/* ✅ Juste le bouton Next */}
        <View style={{ alignItems: 'flex-end', marginTop: 20, marginBottom: 40 }}>
          <NextButton onPress={() => router.push('/chapters/Chapter1/chp1/chp1_01/LearnScreen')} />
        </View>
      </ScrollView>
    </View>


  );
}
