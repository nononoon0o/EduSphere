import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../../style/ChapterStyle/Chapter2/Chapter2_04Styles'; // Adjust the path as necessary

const AtmosphereMenuScreen = () => {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Back Navigation */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/chapters/Chapter2')}>
        <Ionicons name="chevron-back" size={22} color="#1e3a8a" />
        <Text style={styles.backText}>돌아가기</Text>
      </TouchableOpacity>

      <Text style={styles.title}>04 날씨의 변화</Text>
      <Text style={styles.subtitle}>날씨 변화는 단순히 기온이나 비가 내리는 정도를 넘어서...</Text>


      <TouchableOpacity style={styles.option} onPress={() => router.push('/chapters/Chapter2/chp2/chp2_04/ScientificPrinciples')}>
        <Text style={styles.optionText}>1. 날씨 변화의 과학적 원리</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={() => router.push('/chapters/Chapter2/chp2/chp2_04/ForecastingModeling')}>
        <Text style={styles.optionText}>2. 날씨 변화의 예측과 모델링</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={() => router.push('/chapters/Chapter2/chp2/chp2_04/WeatherImpact')}>
        <Text style={styles.optionText}>3. 날씨 변화가 인간과 환경에 미치는 영향</Text>
      </TouchableOpacity>

    </ScrollView>
  );
};


export default AtmosphereMenuScreen;
