import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Chapter1_01() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={20} color="#2c3e50" />
        <Text style={styles.backText}>뒤로가기</Text>
      </TouchableOpacity>

      <View style={styles.header}>
        <FontAwesome5 name="flask" size={22} color="#2980b9" style={{ marginRight: 10 }} />
        <Text style={styles.subtitle}>Chapter 1</Text>
      </View>

      {/* (개념요약) Section */}
      <View style={styles.section}>
        <TouchableOpacity onPress={() => router.push('/learnPages/ConceptSummaryScreen')}>
          <Text style={styles.sectionTitle}>📘 (학습목표 & 개념요약)</Text>
        </TouchableOpacity>
      </View>

      {/* (학습하기) Section */}
      <View style={styles.section}>
        <TouchableOpacity onPress={() => router.push('/learnPages/glb-viewer')}>
          <Text style={styles.sectionTitle}>📦 (학습하기)</Text>
        </TouchableOpacity>
      </View>

      {/* (영상 학습) Section */}
      <View style={styles.section}>
        <TouchableOpacity onPress={() => router.push('/learnPages/VideoLearningScreen')}>
          <Text style={styles.sectionTitle}>🎬 (영상 학습)</Text>
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
    marginBottom: 12,
  },
  backText: {
    fontSize: 16,
    marginLeft: 6,
    color: '#2c3e50',
    fontWeight: '500',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  section: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#eaf2ff',
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2e86de',
    marginBottom: 8,
  },
  buttonBlue: {
    flex: 1,
    backgroundColor: '#3498db',
    padding: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  buttonOrange: {
    flex: 1,
    backgroundColor: '#e67e22',
    padding: 12,
    borderRadius: 6,
    marginLeft: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});
