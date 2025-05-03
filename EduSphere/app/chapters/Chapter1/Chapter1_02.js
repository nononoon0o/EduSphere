import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';

export default function Chapter1_02() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Back button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/chapters/Chapter1')}>
        <Ionicons name="chevron-back" size={22} color="#fff" />
        <Text style={styles.backText}>Home</Text>
      </TouchableOpacity>

      {/* Subtitle */}
      <Text style={styles.subtitle}>{t('chapter1_02.subtitle')}</Text>
      <Text style={styles.description}>{t('chapter1_02.description')}</Text>

      {/* Navigation Buttons */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push('/chapters/Chapter1/chp1/chp1_02/ConceptSummaryScreen')}
      >
        <Text style={styles.cardText}>{t('chapter1_02.cards.law1')}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push('/chapters/Chapter1/chp1/chp1_02/GLBViewer')}
      >
        <Text style={styles.cardText}>{t('chapter1_02.cards.law2')}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push('/chapters/Chapter1/chp1/chp1_02/VideoLearningScreen')}
      >
        <Text style={styles.cardText}>{t('chapter1_02.cards.law3')}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 20,
    minHeight: '100%',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e3a8a',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 30,
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  backText: {
    fontSize: 16,
    marginLeft: 6,
    color: '#fff',
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 16,
    color: '#157347',
    fontWeight: '700',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#1e1e1e',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#d9e6c3',
    borderRadius: 10,
    paddingVertical: 18,
    paddingHorizontal: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  cardText: {
    fontSize: 16,
    color: '#1f1f1f',
    fontWeight: '500',
  },
});
