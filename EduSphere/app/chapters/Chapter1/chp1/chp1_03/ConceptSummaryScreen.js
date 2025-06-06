import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../../../../style/ChapterStyle/Chapter1/ch1Style/interactiveStyles';
import BackButton from '../../../../../components/BackButton';
import { useTranslation } from 'react-i18next';

export default function ConceptSummaryScreen() {
  const router = useRouter();
  const { t } = useTranslation();

  const exampleDetails = t('chapter1_03.conceptSummary.exampleDetails', { returnObjects: true });

  return (
    <View style={styles.container}>
      {/* Back button */}
      <BackButton onPress={() => router.replace('/chapters/Chapter1/Chapter1_03')} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Learning Objective */}
        <Text style={styles.text}>
          {t('chapter1_03.conceptSummary.objective')}
        </Text>

        {/* Concept Section */}
        <View style={styles.conceptSection}>
          {/* Chemical Equation */}
          <Text style={styles.conceptTitle}>{t('chapter1_03.conceptSummary.chemicalEquation')}</Text>

          <Text style={styles.itemTitle}>{t('chapter1_03.conceptSummary.definition')}</Text>
          <Text style={styles.description}>{t('chapter1_03.conceptSummary.definitionDesc')}</Text>

          <Text style={styles.itemTitle}>{t('chapter1_03.conceptSummary.components')}</Text>
          <Text style={styles.description}>{t('chapter1_03.conceptSummary.reactants')}</Text>
          <Text style={styles.description}>{t('chapter1_03.conceptSummary.products')}</Text>

          <Text style={styles.itemTitle}>{t('chapter1_03.conceptSummary.example')}</Text>
          <Text style={styles.description}>{t('chapter1_03.conceptSummary.reaction')}</Text>

          {/* Chemical Change */}
          <Text style={styles.conceptTitle}>{t('chapter1_03.conceptSummary.changeTitle')}</Text>

          <Text style={styles.itemTitle}>{t('chapter1_03.conceptSummary.definition')}</Text>
          <Text style={styles.description}>{t('chapter1_03.conceptSummary.coefficientDesc')}</Text>

          <Text style={styles.itemTitle}>{t('chapter1_03.conceptSummary.role')}</Text>
          <Text style={styles.description}>{t('chapter1_03.conceptSummary.roleDesc')}</Text>

          <Text style={styles.itemTitle}>{t('chapter1_03.conceptSummary.caution')}</Text>
          <Text style={styles.description}>{t('chapter1_03.conceptSummary.cautionDesc')}</Text>

          <Text style={styles.itemTitle}>{t('chapter1_03.conceptSummary.example')}</Text>
          {Array.isArray(exampleDetails) ? (
            exampleDetails.map((line, idx) => (
              <Text key={idx} style={styles.description}>{line}</Text>
            ))
          ) : (
            <Text style={styles.description}>{exampleDetails}</Text>
          )}
        </View>

        {/* Next Page Button */}
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => router.push('/chapters/Chapter1/chp1/chp1_03/LearnScreen')}
          >
            <Ionicons name="arrow-forward" size={24} color="#fff" />
            <View style={styles.nextButtonCircle}>
              <Text style={styles.nextButtonText}>{t('chapter1_03.conceptSummary.next')}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
