import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import styles from '../../../style/ChapterStyle/Chapter1/commonChapterStyles';

export default function Chapter1_01() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/chapters/Chapter1')}>
        <Ionicons name="chevron-back" size={24} color="#1e3a8a" />
        <Text style={styles.backText}>Home</Text>
      </TouchableOpacity>

      <View style={styles.header}>
        <FontAwesome5 name="flask" size={24} color="#2980b9" style={styles.icon} />
        <Text style={styles.subtitle}>{t('chapter1_01.subtitle')}</Text>
      </View>

      <Text style={styles.sectionHeader}>{t('03. 화학 반응식')}</Text>

      <View style={styles.sectionsContainer}>
        <TouchableOpacity
          style={styles.sectionButton}
          onPress={() => router.push('/chapters/Chapter1/chp1/chp1_03/ConceptSummaryScreen')}
        >
          <Text style={styles.sectionEmoji}>📘</Text>
          <Text style={styles.sectionTitle}>{t('chapter1_01.sections.concept')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.sectionButton}
          onPress={() => router.push('/chapters/Chapter1/chp1/chp1_03/LearnScreen')}
        >
          <Text style={styles.sectionEmoji}>📦</Text>
          <Text style={styles.sectionTitle}>{t('chapter1_01.sections.learn')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.sectionButton}
          onPress={() => router.push('/chapters/Chapter1/chp1/chp1_03/VideoLearningScreen')}
        >
          <Text style={styles.sectionEmoji}>🎬</Text>
          <Text style={styles.sectionTitle}>{t('chapter1_01.sections.video')}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
