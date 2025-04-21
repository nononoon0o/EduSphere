import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export const subtitle = "04 날씨의 변화";

export default function Chapter2_04() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/chapters/Chapter2')}>
        <Ionicons name="chevron-back" size={20} color="#1e3a8a" />
        <Text style={styles.backText}>돌아가기</Text>
      </TouchableOpacity>

      <Text style={styles.subtitle}>{subtitle}</Text>
      
      <Text style={styles.text}>
        날씨 변화는 단순히 기온이나 비가 내리는 정도를 넘어서...
      </Text>

      <Text style={styles.header}>1. 날씨 변화의 과학적 원리</Text>
      <Text style={styles.text}>
        날씨는 주로 대기층 내의 물리적, 화학적 상호작용에 의해 결정됩니다...
      </Text>

      <Text style={styles.subHeader}>기온 (Temperature)</Text>
      <Text style={styles.text}>
        기온은 대기의 온도를 측정하는 값으로...
      </Text>

      <Text style={styles.subHeader}>기압 (Pressure)</Text>
      <Text style={styles.text}>
        기압은 대기의 무게에 의한 압력으로...
      </Text>

      <Text style={styles.subHeader}>습도 (Humidity)</Text>
      <Text style={styles.text}>
        습도는 대기 중에 존재하는 수증기의 양을 의미합니다...
      </Text>

      <Text style={styles.subHeader}>바람 (Wind)</Text>
      <Text style={styles.text}>
        바람은 대기 중에서 공기의 흐름을 말하며...
      </Text>

      <Text style={styles.header}>2. 날씨 변화의 예측과 모델링</Text>
      <Text style={styles.text}>
        기상학자들은 날씨 변화를 예측하기 위해...
      </Text>

      <Text style={styles.subHeader}>수치 예보 모델 (NWP)</Text>
      <Text style={styles.text}>
        수치 예보 모델은 대기와 해양의 상태를 수학적으로 모델링하여...
      </Text>

      <Text style={styles.subHeader}>기상 위성 (Weather Satellites)</Text>
      <Text style={styles.text}>
        위성은 지구의 대기와 표면을 관측하는 데 사용됩니다...
      </Text>

      <Text style={styles.header}>3. 날씨 변화가 인간과 환경에 미치는 영향</Text>
      <Text style={styles.text}>
        날씨 변화는 인간 사회와 자연 환경에 많은 영향을 미칩니다...
      </Text>

      <Text style={styles.subHeader}>농업</Text>
      <Text style={styles.text}>
        날씨 변화는 농작물의 생산에 매우 중요한 영향을 미칩니다...
      </Text>

      <Text style={styles.subHeader}>교통</Text>
      <Text style={styles.text}>
        날씨 변화는 교통 시스템에 중요한 영향을 미칩니다...
      </Text>

      <Text style={styles.subHeader}>재난 관리</Text>
      <Text style={styles.text}>
        기후 변화로 인한 자연 재해는 인간과 환경에 치명적인 영향을 미칠 수 있습니다...
      </Text>

      <Text style={styles.subHeader}>기후 변화</Text>
      <Text style={styles.text}>
        기후 변화는 장기적인 날씨의 변화를 의미합니다...
      </Text>

      <Text style={styles.header}>4. 결론</Text>
      <Text style={styles.text}>
        날씨의 변화는 자연현상에서 중요한 역할을 하며...
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f9f9f9',
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
  subtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
    color: '#555',
  },
  subHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
    color: '#666',
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 10,
  },
});
