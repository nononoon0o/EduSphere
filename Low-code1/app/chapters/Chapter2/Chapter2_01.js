import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faTemperatureHigh,
  faCloud,
  faCloudSun,
  faSun,
  faRain,
  faSnowflake,
} from '@fortawesome/free-solid-svg-icons';

export default function ClimateScienceContent() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Back Navigation */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.replace('/chapters/Chapter2')}
      >
        <Ionicons name="chevron-back" size={22} color="#1e3a8a" />
        <Text style={styles.backText}>돌아가기</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollableContainer}>
        <Text style={styles.header}>기권과 지구 기온 (The Atmosphere and Earth's Temperature)</Text>

        {/* 1. 구성 */}
        <View style={styles.section}>
          <Text style={styles.subHeader}>1. 지구 대기의 구성</Text>
          <Text style={styles.text}>
            대기는 주로 질소(N₂) 78%, 산소(O₂) 21%, 그리고 이산화탄소(CO₂), 메탄(CH₄), 오존(O₃), 수증기(H₂O) 등 추적 가스로 이루어져 있습니다.
          </Text>
          <Text style={styles.bullet}><FontAwesomeIcon icon={faCloudSun} /> 질소(N₂): 비활성 기체</Text>
          <Text style={styles.bullet}><FontAwesomeIcon icon={faSun} /> 산소(O₂): 호흡과 연소에 중요</Text>
          <Text style={styles.bullet}><FontAwesomeIcon icon={faTemperatureHigh} /> 이산화탄소(CO₂): 온실 효과</Text>
          <Text style={styles.bullet}><FontAwesomeIcon icon={faCloud} /> 메탄(CH₄): 강력한 온실가스</Text>
          <Text style={styles.bullet}><FontAwesomeIcon icon={faSnowflake} /> 수증기(H₂O): 날씨 시스템과 관련</Text>
        </View>

        {/* 2. 온실 효과 */}
        <View style={styles.section}>
          <Text style={styles.subHeader}>2. 온실 효과와 지구 온난화</Text>
          <Text style={styles.text}>
            온실 가스들이 열을 흡수하고 방출하여 지구를 따뜻하게 만듭니다.
          </Text>
          <Text style={styles.bullet}><FontAwesomeIcon icon={faCloudSun} /> 태양 에너지 흡수</Text>
          <Text style={styles.bullet}><FontAwesomeIcon icon={faRain} /> 적외선 복사 차단</Text>
          <Text style={styles.bullet}><FontAwesomeIcon icon={faTemperatureHigh} /> 강화된 온실 효과</Text>
        </View>

        {/* 3. 화학 반응 */}
        <View style={styles.section}>
          <Text style={styles.subHeader}>3. 기후 역학에서의 화학 반응</Text>
          <Text style={styles.bullet}><FontAwesomeIcon icon={faSun} /> 연소 반응</Text>
          <Text style={styles.bullet}><FontAwesomeIcon icon={faCloud} /> 광합성과 호흡</Text>
          <Text style={styles.bullet}><FontAwesomeIcon icon={faTemperatureHigh} /> 해양 흡수 및 탄소 격리</Text>
        </View>

        {/* 4. 에너지 전송 */}
        <View style={styles.section}>
          <Text style={styles.subHeader}>4. 에너지 전송 메커니즘</Text>
          <Text style={styles.bullet}><FontAwesomeIcon icon={faSun} /> 전도</Text>
          <Text style={styles.bullet}><FontAwesomeIcon icon={faCloudSun} /> 대류</Text>
          <Text style={styles.bullet}><FontAwesomeIcon icon={faRain} /> 복사</Text>
        </View>

        {/* 5. 인간 영향 */}
        <View style={styles.section}>
          <Text style={styles.subHeader}>5. 인간의 영향</Text>
          <Text style={styles.bullet}><FontAwesomeIcon icon={faCloud} /> 화석 연료 연소</Text>
          <Text style={styles.bullet}><FontAwesomeIcon icon={faSun} /> 산림 벌채</Text>
          <Text style={styles.bullet}><FontAwesomeIcon icon={faRain} /> 농업 및 가축</Text>
        </View>

        {/* 6. 기후 변화 결과 */}
        <View style={styles.section}>
          <Text style={styles.subHeader}>6. 기후 변화의 영향</Text>
          <Text style={styles.bullet}><FontAwesomeIcon icon={faTemperatureHigh} /> 지구 온도 상승</Text>
          <Text style={styles.bullet}><FontAwesomeIcon icon={faSnowflake} /> 빙하 융해 및 해수면 상승</Text>
          <Text style={styles.bullet}><FontAwesomeIcon icon={faCloud} /> 극단적 날씨</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#e3e8f7',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  backText: {
    fontSize: 16,
    marginLeft: 6,
    color: '#1e3a8a',
    fontWeight: '600',
  },
  scrollableContainer: {
    paddingBottom: 80,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2c3e50',
    marginBottom: 24,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2980b9',
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
    lineHeight: 22,
  },
  section: {
    marginBottom: 28,
  },
  bullet: {
    fontSize: 15,
    color: '#444',
    marginBottom: 6,
    paddingLeft: 10,
  },
});
