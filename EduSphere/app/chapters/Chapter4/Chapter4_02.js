import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export const subtitle = "02 신경계와 호르몬";

export default function Chapter4_02() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* 🔙 Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/chapters/Chapter4')}>
        <Ionicons name="arrow-back" size={20} color="#4a235a" />
        <Text style={styles.backText}>돌아가기</Text>
      </TouchableOpacity>

      {/* Title & Content */}
      <Text style={styles.subtitle}>{subtitle}</Text>
      <Text style={styles.content}>
        화학 반응에서 질량이 보존되는 원리와, 일정한 비율로 성분이 결합하는 법칙을 배웁니다.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fdfbff',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backText: {
    fontSize: 15,
    marginLeft: 6,
    color: '#4a235a',
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    color: '#34495e',
    lineHeight: 22,
  },
});
