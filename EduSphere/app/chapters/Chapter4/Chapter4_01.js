import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../../style/ChapterStyle/Chapter4/Chapter4_01Styles'; // Adjust the path as necessary
import BackButton from '../../../components/BackButton'; // ✅ Import reusable BackButton


export const subtitle = "01 감각 기관";

export default function Chapter4_01() {
  const router = useRouter();

  return (
    <View style={styles.container}>
        <BackButton onPress={() => router.replace('/chapters/Chapter4')} /> {/* ✅ Reusable */}
      {/* Title & Content */}
      <Text style={styles.subtitle}>{subtitle}</Text>
      <Text style={styles.content}>
        이 단원에서는 물질이 어떻게 변화하고, 그 변화를 화학 반응식으로 표현하는 방법을 배웁니다.
      </Text>
    </View>
  );
}
