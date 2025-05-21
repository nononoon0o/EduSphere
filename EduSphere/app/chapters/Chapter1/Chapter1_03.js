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
<<<<<<<< HEAD:EduSphere/app/chapters/Chapter1/Chapter1_01.js
        <FontAwesome5 name="flask" size={24} color="#2980b9" style={styles.icon} />
        <Text style={styles.subtitle}>{t('chapter1_01.subtitle')}</Text>
      </View>

      <Text style={styles.sectionHeader}>{t('chapter1_01.title')}</Text>

      <View style={styles.sectionsContainer}>
        <TouchableOpacity
          style={styles.sectionButton}
          onPress={() => router.push('/chapters/Chapter1/chp1/chp1_01/learnPages/ConceptSummaryScreen')}
        >
          <Text style={styles.sectionEmoji}>📘</Text>
          <Text style={styles.sectionTitle}>{t('chapter1_01.sections.concept')}</Text>
========
        <FontAwesome5 name="flask" size={22} color="#2980b9" style={{ marginRight: 10 }} />
        <Text style={styles.subtitle}>03. 화학 반응식</Text>
      </View>

      {/* (개념요약) Section */}
      <View style={styles.section}>
        <TouchableOpacity onPress={() => router.push('/learnPages/Chapter1_03/ConceptSummaryScreen')}>
          <Text style={styles.sectionTitle}>📘 (학습목표 & 개념요약)</Text>
>>>>>>>> feature/frontend-3D:EduSphere/app/chapters/Chapter1/Chapter1_03.js
        </TouchableOpacity>
      </View>

<<<<<<<< HEAD:EduSphere/app/chapters/Chapter1/Chapter1_01.js
        <TouchableOpacity
          style={styles.sectionButton}
          onPress={() => router.push('/chapters/Chapter1/chp1/chp1_01/learnPages/LearnScreen')}
        >
          <Text style={styles.sectionEmoji}>📦</Text>
          <Text style={styles.sectionTitle}>{t('chapter1_01.sections.learn')}</Text>
========
      {/* (학습하기) Section */}
      <View style={styles.section}>
        <TouchableOpacity onPress={() => router.push('/learnPages/Chapter1_03/LearnScreen')}>
          <Text style={styles.sectionTitle}>📦 (학습하기)</Text>
>>>>>>>> feature/frontend-3D:EduSphere/app/chapters/Chapter1/Chapter1_03.js
        </TouchableOpacity>
      </View>

<<<<<<<< HEAD:EduSphere/app/chapters/Chapter1/Chapter1_01.js
        <TouchableOpacity
          style={styles.sectionButton}
          onPress={() => router.push('/chapters/Chapter1/chp1/chp1_01/learnPages/VideoLearningScreen')}
        >
          <Text style={styles.sectionEmoji}>🎬</Text>
          <Text style={styles.sectionTitle}>{t('chapter1_01.sections.video')}</Text>
========
      {/* (영상 학습) Section */}
      <View style={styles.section}>
        <TouchableOpacity onPress={() => router.push('/learnPages/Chapter1_03/VideoLearningScreen')}>
          <Text style={styles.sectionTitle}>🎬 (영상 학습)</Text>
>>>>>>>> feature/frontend-3D:EduSphere/app/chapters/Chapter1/Chapter1_03.js
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f9fcff',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  backText: {
    fontSize: 16,
    marginLeft: 8,
    color: '#1e3a8a',
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    marginRight: 12,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2c3e50',
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: '700',
    color: '#34495e',
    marginBottom: 24,
  },
  sectionsContainer: {
    marginBottom: 30,
  },
  sectionButton: {
    backgroundColor: '#e3f2fd',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
  },
  sectionEmoji: {
    fontSize: 22,
    marginRight: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e3a8a',
  },
});
