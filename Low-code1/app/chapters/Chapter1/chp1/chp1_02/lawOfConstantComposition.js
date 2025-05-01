import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function LawOfConstantCompositionRatio() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="arrow-back" size={20} color="white" />
          <Text style={styles.backText}>돌아가기</Text>
        </TouchableOpacity>

        <Text style={styles.title}>📊 2. 일정 성분비의 법칙</Text>

        <Text style={styles.text}>
          프랑스 화학자 조제프 프루스트는 하나의 화합물은 언제나 일정한 질량비로 구성된다는 사실을 밝혔습니다.{"\n"}
          이는 화합물의 조성은 항상 일정하다는 것을 의미합니다.{"\n\n"}
          • 예: H₂O는 수소 2개, 산소 1개의 비율로 이루어짐{"\n"}
          • 질량 비율은 수소 11.1%, 산소 88.9%{"\n"}
          • 혼합물(예: 소금물)과는 구별됨{"\n"}
          • 예외: 산화철처럼 다양한 비율로 결합하는 경우는 다중 비례의 법칙으로 설명됩니다.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#672c2c', // Same background as other page
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
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
});
