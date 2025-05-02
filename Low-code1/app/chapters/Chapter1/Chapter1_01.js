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

export default function Chapter1_01() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Back Navigation */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/chapters/Chapter1')}>
        <Ionicons name="chevron-back" size={24} color="#1e3a8a" />
        <Text style={styles.backText}>돌아가기</Text>
      </TouchableOpacity>

      {/* Chapter Header */}
      <View style={styles.header}>
        <FontAwesome5 name="flask" size={24} color="#2980b9" style={styles.icon} />
        <Text style={styles.subtitle}>01. 물질 변화와 화학 반응식</Text>
      </View>

      {/* Section Title */}
      <Text style={styles.sectionHeader}>I. 화학 반응의 규칙과 에너지 변화</Text>

      {/* Section Buttons */}
      <View style={styles.sectionsContainer}>
        <TouchableOpacity
          style={styles.sectionButton}
          onPress={() => router.push('/chapters/Chapter1/chp1/chp1_01/learnPages/ConceptSummaryScreen')}
        >
          <Text style={styles.sectionEmoji}>📘</Text>
          <Text style={styles.sectionTitle}>개념 요약</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.sectionButton}
          onPress={() => router.push('/chapters/Chapter1/chp1/chp1_01/learnPages/LearnScreen')}
        >
          <Text style={styles.sectionEmoji}>📦</Text>
          <Text style={styles.sectionTitle}>학습하기</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.sectionButton}
          onPress={() => router.push('/chapters/Chapter1/chp1/chp1_01/learnPages/VideoLearningScreen')}
        >
          <Text style={styles.sectionEmoji}>🎬</Text>
          <Text style={styles.sectionTitle}>영상 학습</Text>
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
