import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import styles from '../../../../../../style/ChapterStyle/Chapter1/ch1Style/ConceptStyle';

export default function ConceptSummaryScreen() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={20} color="#2c3e50" />
        <Text style={styles.backText}>{t('concept.back')}</Text>
      </TouchableOpacity>

      <Text style={styles.text}>{t('concept.goal')}</Text>

      <View style={styles.conceptSection}>
        {/* Physical Change */}
        <Text style={styles.conceptTitle}>🔷 {t('concept.physical.title')}</Text>

        <Text style={styles.itemTitle}>{t('concept.features')}:</Text>
        <Text style={styles.description}>- {t('concept.physical.feature1')}</Text>
        <Text style={styles.description}>- {t('concept.physical.feature2')}</Text>

        <Text style={styles.itemTitle}>{t('concept.examples')}:</Text>
        <Text style={styles.description}>- {t('concept.physical.example1')}</Text>
        <Text style={styles.description}>- {t('concept.physical.example2')}</Text>

        {/* Chemical Change */}
        <Text style={styles.conceptTitle}>🔶 {t('concept.chemical.title')}</Text>

        <Text style={styles.itemTitle}>{t('concept.features')}:</Text>
        <Text style={styles.description}>- {t('concept.chemical.feature1')}</Text>
        <Text style={styles.description}>- {t('concept.chemical.feature2')}</Text>

        <Text style={styles.itemTitle}>{t('concept.examples')}:</Text>
        <Text style={styles.description}>- {t('concept.chemical.example1')}</Text>
        <Text style={styles.description}>- {t('concept.chemical.example2')}</Text>
      </View>
    </View>
  );
}

