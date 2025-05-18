import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../../style/ChapterStyle/Chapter3/Chapter3_02Styles'; // Adjust the path as necessary

export const subtitle = '일과 에너지';

export default function Chapter3_02() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* 🔙 Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/chapters/Chapter3')}>
        <Ionicons name="arrow-back" size={20} color="#1e3a8a" />
        <Text style={styles.backText}>돌아가기</Text>
      </TouchableOpacity>

      <Text style={styles.title}>02 {subtitle}</Text>
      <Text style={styles.content}>
        이 단원에서는 일이란 무엇이며, 일이 에너지와 어떻게 관련되는지를 배웁니다.
      </Text>
    </View>
  );
}