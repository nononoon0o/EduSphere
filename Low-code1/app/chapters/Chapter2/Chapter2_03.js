import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export const subtitle = "03 기압과 바람";

export default function Chapter2_03() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/chapters/Chapter2')}>
        <Ionicons name="chevron-back" size={20} color="#1e3a8a" />
        <Text style={styles.backText}>돌아가기</Text>
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.subtitleText}>{subtitle}</Text>

      {/* Description */}
      <Text style={styles.paragraphText}>
        기체 반응에서의 부피 비율과 화학 반응 중 에너지가 어떻게 주고받는지 알아봅니다.
      </Text>

      {/* Pressure Section */}
      <View style={styles.sectionHeader}>
        <FontAwesome name="tachometer" size={20} style={styles.icon} />
        <Text style={[styles.paragraphText, styles.boldText]}>1. 기압 (Pressure)</Text>
      </View>
      <Text style={styles.paragraphText}>
        기압은 기체가 일정 공간 내에서 분자들이 충돌하는 힘의 총합을 의미합니다...
        {"\n\n"}- 보일의 법칙과 찰스의 법칙에 따라 기압과 부피, 온도는 서로 밀접한 관계...
        {"\n\n"}기체의 부피 비율:
        {"\n"}- 아보가드로의 법칙은...
      </Text>

      {/* Wind Section */}
      <View style={styles.sectionHeader}>
        <FontAwesome name="cloud" size={20} style={styles.icon} />
        <Text style={[styles.paragraphText, styles.boldText]}>2. 바람 (Wind)</Text>
      </View>
      <Text style={styles.paragraphText}>
        바람은 대기 중의 기체가 고온에서 저온으로 이동하는 현상입니다...
        {"\n\n"}기압과 바람의 관계:
        {"\n"}- 바람은 기체의 압력 차이에 따라 발생합니다.
      </Text>

      {/* Chemical Reaction Section */}
      <View style={styles.sectionHeader}>
        <FontAwesome name="flask" size={20} style={styles.icon} />
        <Text style={[styles.paragraphText, styles.boldText]}>3. 화학 반응에서 기체와 에너지의 교환</Text>
      </View>
      <Text style={styles.paragraphText}>
        기체 반응에서는 기압과 온도가 중요한 역할을 하며...
        {"\n\n"}- 엔탈피 변화는...
        {"\n"}- 연료가 연소할 때 에너지를 예측...
      </Text>

      {/* Conclusion Section */}
      <View style={styles.sectionHeader}>
        <FontAwesome name="check-circle" size={20} style={styles.icon} />
        <Text style={[styles.paragraphText, styles.boldText]}>결론</Text>
      </View>
      <Text style={styles.paragraphText}>
        기압과 바람은 화학 반응과 기체의 행동을 이해하는 데 중요한 역할을 합니다...
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F7F9FC',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backText: {
    fontSize: 16,
    marginLeft: 6,
    color: '#1e3a8a',
    fontWeight: '600',
  },
  subtitleText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 10,
  },
  paragraphText: {
    fontSize: 16,
    color: '#34495E',
    lineHeight: 24,
    marginBottom: 20,
  },
  boldText: {
    fontWeight: 'bold',
  },
  icon: {
    marginRight: 10,
    color: '#2C3E50',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
});
