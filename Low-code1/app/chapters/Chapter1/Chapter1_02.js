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
        <Ionicons name="chevron-back" size={22} color="#1e3a8a" />
        <Text style={styles.backText}>돌아가기</Text>
      </TouchableOpacity>

      {/* Chapter Header */}
      <View style={styles.header}>
        <FontAwesome5 name="flask" size={22} color="#2980b9" style={{ marginRight: 10 }} />
        <Text style={styles.subtitle}>02. 화학 반응</Text>
      </View>

      {/* (개념요약) Section */}
      <View style={styles.section}>
        <TouchableOpacity onPress={() => router.push('/learnPages/Chapter1_02/ConceptSummaryScreen')}>
          <Text style={styles.sectionTitle}>📘 (학습목표 & 개념요약)</Text>
        </TouchableOpacity>
      </View>

      {/* (학습하기) Section */}
      <View style={styles.section}>
        <TouchableOpacity onPress={() => router.push('/learnPages/Chapter1_02/LearnScreen')}>
          <Text style={styles.sectionTitle}>📦 (학습하기)</Text>
        </TouchableOpacity>
      </View>

      {/* (영상 학습) Section */}
      <View style={styles.section}>
        <TouchableOpacity onPress={() => router.push('/learnPages/Chapter1_02/VideoLearningScreen')}>
          <Text style={styles.sectionTitle}>🎬 (영상 학습)</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#f9fcff',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backText: {
    fontSize: 16,
    marginLeft: 6,
    color: '#1e3a8a',
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2c3e50',
  },
  sectionsWrapper: {
    gap: 16,
  },
  sectionCard: {
    backgroundColor: '#e3f2fd',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  sectionEmoji: {
    fontSize: 22,
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1e3a8a',
  },
});
