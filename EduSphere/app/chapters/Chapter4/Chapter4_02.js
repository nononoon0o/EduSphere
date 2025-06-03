import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../../style/ChapterStyle/Chapter4/Chapter4_02Styles'; // Adjust the path as necessary
import BackButton from '../../../components/BackButton'; // ✅ Import reusable BackButton

export const subtitle = "02 신경계와 호르몬";

export default function Chapter4_02() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* 🔙 Back Button */}
      <BackButton onPress={() => router.replace('/chapters/Chapter4')} /> {/* ✅ Reusable */}

      {/* Title & Content */}
      <Text style={styles.subtitle}>{subtitle}</Text>
      <Text style={styles.content}>
        화학 반응에서 질량이 보존되는 원리와, 일정한 비율로 성분이 결합하는 법칙을 배웁니다.
      </Text>
    </View>
  );
}
