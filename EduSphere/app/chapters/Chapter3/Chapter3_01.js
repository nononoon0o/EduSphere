import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { router } from 'expo-router';
import styles from '../../../style/ChapterStyle/Chapter3/Chapter3_01Styles'; // Adjust the path as necessary
import BackButton from '../../../components/BackButton'; // ✅ Import reusable BackButton

const MatterChangeScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Back Navigation */}
      <BackButton onPress={() => router.replace('/chapters/Chapter3')} /> {/* ✅ Reusable */}
            {/* Title & Content */}

      <Text style={styles.subtitle}>03 질량 보존 법칙, 일정 성분비 법칙</Text>
      <Text style={styles.description}>
        화학 반응에서 질량이 보존되는 원리와, 일정한 비율로 성분이 결합하는 법칙을 배웁니다.
      </Text>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push('/chapters/Chapter3/chp3/chp3_01/ChangesInMatterScreen')}
      >
        <Text style={styles.cardText}>1. 질량 보존 법칙 (Law of Conservation of Mass)</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push('/chapters/Chapter3/chp3/chp3_02/ChemicalEquationsScreen')}
      >
        <Text style={styles.cardText}>2. 일정 성분비 법칙 (Law of Definite Proportions)</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default MatterChangeScreen;
