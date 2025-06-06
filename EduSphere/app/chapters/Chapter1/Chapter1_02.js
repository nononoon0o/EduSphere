import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import styles from '../../../style/ChapterStyle/Chapter1/commonChapterStyles';
import BackButton from '../../../components/BackButton'; // ✅ Import shared back button

export default function Chapter1_01() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* ✅ Use the shared BackButton */}
            <BackButton onPress={() => router.replace('/chapters/Chapter1')} label="Home" />

      <View style={styles.header}>
        <FontAwesome5 name="flask" size={24} color="#2980b9" style={styles.icon} />
        <Text style={styles.subtitle}>{t('chapter1_02.subtitle')}</Text>
      </View>

      <View style={styles.sectionsContainer}>
        <TouchableOpacity
          style={styles.sectionButton}
          onPress={() => router.push('/chapters/Chapter1/chp1/chp1_02/ConceptSummaryScreen')}
        >
          <Text style={styles.sectionEmoji}>📘</Text>
          <Text style={styles.sectionTitle}>{t('chapter1_01.sections.concept')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.sectionButton}
          onPress={() => router.push('/chapters/Chapter1/chp1/chp1_02/LearnScreen')}
        >
          <Text style={styles.sectionEmoji}>📦</Text>
          <Text style={styles.sectionTitle}>{t('chapter1_01.sections.learn')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.sectionButton}
          onPress={() => router.push('/chapters/Chapter1/chp1/chp1_02/VideoLearningScreen')}
        >
          <Text style={styles.sectionEmoji}>🎬</Text>
          <Text style={styles.sectionTitle}>{t('chapter1_01.sections.video')}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
