import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../../style/ChapterStyle/Chapter4/Chapter4_01Styles'; // Adjust the path as necessary

export const subtitle = "01 감각 기관";

export default function Chapter4_01() {
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
        이 단원에서는 물질이 어떻게 변화하고, 그 변화를 화학 반응식으로 표현하는 방법을 배웁니다.
      </Text>
    </View>
  );
}