import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ImportanceOfTheTwoLaws() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="arrow-back" size={20} color="white" />
          <Text style={styles.backText}>돌아가기</Text>
        </TouchableOpacity>

        <Text style={styles.title}>🔗 3. 두 법칙의 중요성</Text>
        <Text style={styles.text}>
          이 두 법칙은 현대 화학의 기초를 이루며, 원자론과 결합양의 정량적 사고의 기반이 됩니다.{"\n"}
          • 라부아지에는 ‘질량 보존’은 우연한 현상이 아니다.{"\n"}
          • 프루스트는 ‘모든 화합물은 일정한 질량적 구조를 갖는다’{"\n"}
          오늘날의 화학 계산, 반응식 작성, 화합, 비율 계산 등은 모두 이 두 법칙이 기반입니다.
        </Text>

        <Text style={styles.title}>🧠 결론</Text>
        <Text style={styles.text}>
          화학을 공부하는 데 있어 질량 보존의 법칙과 일정 성분비의 법칙은 반드시 이해해야 하는 핵심 개념입니다.{"\n"}
          이를 통해 우리는 화학 반응을 정확히 예측하고 설명할 수 있습니다.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2862ab', // Blue background
    paddingHorizontal: 10,
    paddingTop: 40,
  },
  content: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    minHeight: '90%',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#2a2a80',
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  backText: {
    color: 'white',
    marginLeft: 6,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
});
