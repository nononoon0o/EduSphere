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
        📘 학습목표 :  화학 반응을 화학 반응식으로 표현할 수 있다.
      </Text>
  
      {/* 들여쓰기 섹션 시작 */}
      <View style={styles.conceptSection}>
        <Text style={styles.conceptTitle}>⚗️ 화학 반응식</Text>
        <Text style={styles.description}>
         <Text>정의 : <Text>
         </Text>화학 반응이 일어날 때, 반응하는 물질과 생성되는 물질을 기호와 수식으로 간단하게 나타낸 식입니다.<Text>
          </Text></Text>
         <Text>구성 요소 : <Text>
         </Text>반응물(Reactants): 반응하기 전의 물질 (화학 반응식의 왼쪽에 위치)<Text>
         </Text>생성물(Products): 반응한 뒤에 생성된 물질 (화학 반응식의 오른쪽에 위치)</Text>
         <Text>예시 : </Text>
         <Text>2\mathrm{H}_2 + 1\mathrm{O}_2 \rightarrow 2\mathrm{H}_2\mathrm{O}</Text>
        </Text>
  
        <Text style={styles.conceptTitle}>🔢 화학변화</Text>
        <Text style={styles.description}>
        <Text>정의 : <Text>
         </Text>화학 반응식에서 물질 앞에 붙는 숫자로, **입자의 수(개수)**를 나타냅니다.<Text>
          </Text></Text>
         <Text>역할 : <Text>
         </Text>화학 반응이 일어날 때, 반응 전과 후의 원자 수를 같게 만들어 줍니다. (질량 보존의 법칙)<Text>
         </Text>주의할 점 : </Text>
         <Text>화학식 자체(원자나 분자 내부)는 절대 바꾸지 않고, 앞에 있는 숫자(계수)만 조정합니다.</Text>
         <Text>예시 : </Text>
         <Text>2\mathrm{H}_2 + 1\mathrm{O}_2 \rightarrow 2\mathrm{H}_2\mathrm{O}</Text>
         <Text>수소 분자(H₂)는 2개</Text>
         <Text>산소 분자(O₂)는 1개가 반응해서</Text>
         <Text>물 분자(H₂O) 2개가 생성됨</Text>
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
