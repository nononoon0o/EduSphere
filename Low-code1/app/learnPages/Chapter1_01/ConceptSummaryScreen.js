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
         <Text>특징 : <Text>
         </Text> 새로운 물질이 만들어지지 않습니다.<Text>
          </Text>변화는 보통 되돌릴 수 있습니다</Text>
          <Text></Text>
          <Text>예시 : <Text>
         </Text> 종이를 자르는 것<Text>
          </Text>얼음이 녹아 물이 되는 것</Text>
          
        </Text>
  
        <Text style={styles.conceptTitle}>🔶 화학변화</Text>
        <Text style={styles.description}>
        <Text>특징 : <Text>
         </Text> 원래의 물질이 사라지고 새로운 물질이 생성됩니다.<Text>
          </Text>변화는 보통 되돌리기 어렵습니다</Text>
          <Text></Text>
          <Text>예시 : <Text>
         </Text> 나무가 타서 재가 되는 것<Text>
          </Text>철이 녹슬어 산화철이 되는 것</Text>
          
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
