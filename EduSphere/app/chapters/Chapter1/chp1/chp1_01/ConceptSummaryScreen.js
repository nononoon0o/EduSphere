import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../../../../style/ChapterStyle/Chapter1/ch1Style/interactiveStyles';

export default function ConceptSummaryScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* 뒤로가기 버튼 */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.push('/chapters/Chapter1/Chapter1_01')}>
        <Ionicons name="arrow-back" size={20} color="#2c3e50" />
        <Text style={styles.backText}>뒤로가기</Text>
      </TouchableOpacity>

      {/* 학습목표 */}
      <Text style={styles.text}>
        📘 학습목표 : 물리 변화와 화학 변화의 차이를 설명할 수 있다.
      </Text>

      {/* 주요개념 섹션 */}
      <View style={styles.conceptSection}>
        {/* 물리변화 */}
        <Text style={styles.conceptTitle}>🔷 물리변화</Text>

        <Text style={styles.itemTitle}>특징 :</Text>
        <Text style={styles.description}>- 새로운 물질이 만들어지지 않습니다.</Text>
        <Text style={styles.description}>- 변화는 보통 되돌릴 수 있습니다.</Text>

        <Text style={styles.itemTitle}>예시 :</Text>
        <Text style={styles.description}>- 종이를 자르는 것</Text>
        <Text style={styles.description}>- 얼음이 녹아 물이 되는 것</Text>

        {/* 화학변화 */}
        <Text style={styles.conceptTitle}>🔶 화학변화</Text>

        <Text style={styles.itemTitle}>특징 :</Text>
        <Text style={styles.description}>- 원래의 물질이 사라지고 새로운 물질이 생성됩니다.</Text>
        <Text style={styles.description}>- 변화는 보통 되돌리기 어렵습니다.</Text>

        <Text style={styles.itemTitle}>예시 :</Text>
        <Text style={styles.description}>- 나무가 타서 재가 되는 것</Text>
        <Text style={styles.description}>- 철이 녹슬어 산화철이 되는 것</Text>
      </View>

      {/* 다음 페이지 버튼 */}
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => router.push('/chapters/Chapter1/chp1/chp1_01/LearnScreen')}
      >
        <Ionicons name="arrow-forward" size={24} color="#fff" />
        <View style={styles.nextButtonCircle}>
          <Text style={styles.nextButtonText}>다음</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
