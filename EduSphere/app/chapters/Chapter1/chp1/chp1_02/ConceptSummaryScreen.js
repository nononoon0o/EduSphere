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

  return (
    <View style={styles.container}>
      <BackButton onPress={() => router.replace('/chapters/Chapter1/Chapter1_02')} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* 📘 Learning Objective */}
        <View style={styles.card}>
          <Text style={styles.text}>{t('conceptSummary.objective')}</Text>
        </View>

        {/* 📚 Main Concept */}
        <View style={styles.card}>
          <Text style={styles.text}>{t('conceptSummary.mainConcept')}</Text>
        </View>

        {/* 🧪 Chemical Reaction */}
        <View style={styles.card}>
          <Text style={styles.conceptTitle}>{t('conceptSummary.chemReactionTitle')}</Text>
          <Text style={styles.description}>{t('conceptSummary.chemReaction1')}</Text>
          <Text style={styles.description}>{t('conceptSummary.chemReaction2')}</Text>
        </View>

        {/* 🧪 Features of Chemical Reaction */}
        <View style={styles.card}>
          <Text style={styles.conceptTitle}>{t('conceptSummary.featuresTitle')}</Text>

          <Text style={styles.featureTitle}>{t('conceptSummary.colorChange')}</Text>
          <Text style={styles.description}>{t('conceptSummary.colorExample1')}</Text>
          <Text style={styles.description}>{t('conceptSummary.colorExample2')}</Text>

          <Text style={styles.featureTitle}>{t('conceptSummary.gasRelease')}</Text>
          <Text style={styles.description}>{t('conceptSummary.gasExample1')}</Text>
          <Text style={styles.description}>{t('conceptSummary.gasExample2')}</Text>

          <Text style={styles.featureTitle}>{t('conceptSummary.lightHeat')}</Text>
          <Text style={styles.description}>{t('conceptSummary.lightExample1')}</Text>
          <Text style={styles.description}>{t('conceptSummary.lightExample2')}</Text>

          <Text style={styles.featureTitle}>{t('conceptSummary.precipitate')}</Text>
          <Text style={styles.description}>{t('conceptSummary.precipitateExample1')}</Text>
          <Text style={styles.description}>{t('conceptSummary.precipitateExample2')}</Text>

          <Text style={styles.featureTitle}>{t('conceptSummary.smellChange')}</Text>
          <Text style={styles.description}>{t('conceptSummary.smellExample1')}</Text>
          <Text style={styles.description}>{t('conceptSummary.smellExample2')}</Text>
        </View>

        {/* 👉 Next */}
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => router.push('/chapters/Chapter1/chp1/chp1_02/LearnScreen')}
          >
            <Ionicons name="arrow-forward" size={24} color="#fff" />
            <View style={styles.nextButtonCircle}>
              <Text style={styles.nextButtonText}>{t('conceptSummary.next')}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
