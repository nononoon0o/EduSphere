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
        📘 학습목표 : 화학 반응을 이해하고, 입자 배열로 화학 반응을 설명할 수 있다.
      </Text>
      <Text style={styles.text}>
        📚 주요개념 : 물리 변화와 화학 변화의 차이점을 이해할 수 있다.
      </Text>
      <Text>화학 반응 : 두 가지 이상의 물질이 반응하여 새로운 물질을 만드는 현상.</Text>
      <Text>반응 전과 후의 입자 배열 변화가 일어나며, 물질의 성질이 새롭게 바뀜.</Text>
      <Text></Text>
      {/* 들여쓰기 섹션 시작 */}
      <Text style={styles.text}>
        🧪 화학 반응의 특징
      </Text>
      <View style={styles.conceptSection}>
        <Text style={styles.conceptTitle}>🎨 색깔 변화</Text>
        <Text style={styles.description}>
         <Text>예시 : <Text>
         </Text>철이 녹슬면서 갈색(산화철)으로 변함<Text>
         </Text>잎이 가을에 초록색에서 노란색으로 변함 (광합성 관련 물질 변화)</Text>
          <Text></Text> 
        </Text>
  
        <Text style={styles.conceptTitle}>💨 기체 발생</Text>
        <Text style={styles.description}>
        <Text>예시 : <Text>
         </Text>식초(아세트산)와 베이킹소다(탄산수소나트륨) 반응 → 이산화탄소 발생<Text>
         </Text>철과 염산 반응 → 수소 기체 발생</Text>
          <Text></Text>
        </Text>

        <Text style={styles.conceptTitle}>🔥 빛/열 발생</Text>
        <Text style={styles.description}>
         <Text>예시 : <Text>
         </Text>폭죽이 터질 때 빛과 열 발생<Text>
         </Text>촛불이 타면서 빛과 열 방출</Text>
          <Text></Text> 
        </Text>

        <Text style={styles.conceptTitle}>🧱 고체 생성</Text>
        <Text style={styles.description}>
         <Text>예시 : <Text>
         </Text>탄산칼슘 침전: 석회수에 이산화탄소를 통과시키면 뿌옇게 침전 형성<Text>
         </Text>황산구리 수용액에 철을 넣으면 철이 구리로 침전됨</Text>
          <Text></Text> 
        </Text>

        <Text style={styles.conceptTitle}>👃 냄새 변화</Text>
        <Text style={styles.description}>
         <Text>예시 : <Text>
         </Text>음식물이 부패할 때 고약한 냄새 발생<Text>
         </Text>양파를 썰 때 톡 쏘는 냄새 발생 (화학 반응으로 생성된 황 화합물)</Text>
          <Text></Text> 
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
