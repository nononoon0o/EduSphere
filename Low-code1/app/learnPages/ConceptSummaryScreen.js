import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function ConceptSummaryScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={20} color="#2c3e50" />
        <Text style={styles.backText}>뒤로가기</Text>
      </TouchableOpacity>
  
      <Text style={styles.text}>
        📘 학습목표 : 물리 변화와 화학 변화의 차이를 설명할 수 있다.
      </Text>
  
      {/* 들여쓰기 섹션 시작 */}
      <View style={styles.conceptSection}>
        <Text style={styles.conceptTitle}>🔷 물리변화</Text>
        <Text style={styles.description}>
          물질의 <Text style={styles.bold}>성질은 변하지 않으면서</Text> 모양이나 상태가 변하는 물질의 변화입니다.{" "}
          
        </Text>
  
        <Text style={styles.conceptTitle}>🔶 화학변화</Text>
        <Text style={styles.description}>
          처음 물질과는 <Text style={styles.bold}>성질이 전혀 다른 새로운 물질</Text>로 변하는 변화입니다.{" "}
          
        </Text>
      </View>
    </View>
  );
  
  
  
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#f9fcff',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  backText: {
    fontSize: 16,
    marginLeft: 6,
    color: '#2c3e50',
    fontWeight: '500',
  },
  text: {
    fontSize: 20,
    color: '#2c3e50',
    fontWeight: '600',
  },
});
