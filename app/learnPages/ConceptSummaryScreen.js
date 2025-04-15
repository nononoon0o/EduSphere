import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function ConceptSummaryScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={20} color="#2c3e50" />
        <Text style={styles.backText}>뒤로가기</Text>
      </TouchableOpacity>

      <Text style={styles.text}>📘 개념요약 페이지입니다.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#f9fcff',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  backText: {
    fontSize: 16,
    marginLeft: 6,
    color: '#2c3e50',
    fontWeight: '500',
  },
  text: {
    fontSize: 20,
    color: '#2c3e50',
    fontWeight: '600',
  },
});
