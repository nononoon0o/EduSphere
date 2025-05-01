import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function LawOfConservationOfMass() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="arrow-back" size={20} color="white" />
          <Text style={styles.backText}>돌아가기</Text>
        </TouchableOpacity>

        <Text style={styles.title}>🔷 1. 질량 보존의 법칙</Text>

        <Text style={styles.text}>
          “아무것도 생성되지 않고, 아무것도 사라지지 않으며, 모든 것은 단지 변할 뿐이다.” 라는 말은 프랑스 화학자 라부아지에가 설명한 질량 보존의 법칙을 요약합니다.{"\n\n"}
          • 화학 반응이 일어날 때, 반응물의 총 질량은 생성물의 총 질량과 항상 같습니다.{"\n"}
          • 원자는 생성되거나 소멸되지 않으며, 배열만 달라집니다.{"\n"}
          • 밀폐된 계에서는 질량이 항상 같게 유지됩니다.{"\n"}
          예시: 2H₂ + O₂ → 2H₂O (4g 수소 + 32g 산소 = 36g 물){"\n"}
          • 실험, 실험실 등에서 물질의 반응량 예측에 활용됩니다.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#672c2c', // Deep red-brown background
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
