import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';

export const subtitle = "01 물질 변화와 화학 반응식";

export default function Chapter3_01() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* 🔙 Return Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/chapters/Chapter3')}>
        <Icon name="arrow-back" size={22} color="#1e3a8a" />
        <Text style={styles.backText}>돌아가기</Text>
      </TouchableOpacity>

      <Text style={styles.subtitle}>{subtitle}</Text>

      {/* Introduction */}
      <View style={styles.sectionWrapper}>
        <Icon name="info" style={styles.iconLarge} />
        <Text style={styles.text}>
          이 단원에서는 물질이 어떻게 변화하고, 그 변화를 화학 반응식으로 표현하는 방법을 배웁니다...
        </Text>
      </View>

      {/* 물질의 변화 (Changes in Matter) */}
      <View style={styles.sectionWrapper}>
        <Icon name="change-history" style={styles.iconLarge} />
        <Text style={styles.sectionTitle}>1. 물질의 변화 (Changes in Matter)</Text>
        <Text style={styles.text}>
          물질은 물리적 변화와 화학적 변화로 나눌 수 있습니다.
        </Text>
      </View>

      {/* 물리적 변화 */}
      <View style={styles.sectionWrapper}>
        <Icon name="sync" style={styles.iconSmall} />
        <Text style={styles.subsectionTitle}>1.1 물리적 변화 (Physical Changes)</Text>
        <Text style={styles.text}>
          물리적 변화는 물질의 상태나 모양이 바뀌지만 화학적 성질은 변하지 않는 변화입니다...
        </Text>
      </View>

      {/* 화학적 변화 */}
      <View style={styles.sectionWrapper}>
        <Icon name="autorenew" style={styles.iconSmall} />
        <Text style={styles.subsectionTitle}>1.2 화학적 변화 (Chemical Changes)</Text>
        <Text style={styles.text}>
          화학적 변화는 물질이 변하여 새로운 물질이 형성되는 과정입니다...
        </Text>
      </View>

      {/* 화학 반응식 */}
      <View style={styles.sectionWrapper}>
        <Icon name="functions" style={styles.iconLarge} />
        <Text style={styles.sectionTitle}>2. 화학 반응식 (Chemical Equations)</Text>
        <Text style={styles.text}>
          화학 반응은 반응물과 생성물, 그리고 그들의 비율을 화학 반응식으로 나타냅니다...
        </Text>
      </View>

      {/* 구성 요소 */}
      <View style={styles.sectionWrapper}>
        <Icon name="list" style={styles.iconSmall} />
        <Text style={styles.subsectionTitle}>화학 반응식의 주요 구성 요소</Text>
        <Text style={styles.text}>
          - Reactants (반응물), Products (생성물), Coefficients (계수), State Symbols (상태 기호) 등...
        </Text>
        <Text style={styles.textBold}>2H₂O (l) → 2H₂ (g) + O₂ (g)</Text>
      </View>

      {/* 균형 맞추기 */}
      <View style={styles.sectionWrapper}>
        <Icon name="scale" style={styles.iconSmall} />
        <Text style={styles.subsectionTitle}>2.2 화학 반응식 균형 맞추기</Text>
        <Text style={styles.text}>
          CH₄ (g) + 2O₂ (g) → CO₂ (g) + 2H₂O (g)
        </Text>
      </View>

      {/* 에너지 변화 */}
      <View style={styles.sectionWrapper}>
        <Icon name="power" style={styles.iconSmall} />
        <Text style={styles.subsectionTitle}>2.4 화학 반응의 에너지 변화</Text>
        <Text style={styles.text}>
          일부 반응은 에너지를 방출하고, 일부는 흡수합니다...
        </Text>
      </View>

      {/* 결론 */}
      <View style={styles.sectionWrapper}>
        <Icon name="check-circle" style={styles.iconLarge} />
        <Text style={styles.text}>
          이 단원에서는 화학 반응과 물질 변화가 단지 이론적인 개념이 아니라...
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#1e3a8a',
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  sectionWrapper: {
    marginTop: 20,
    paddingLeft: 15,
    paddingRight: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2980b9',
    marginTop: 20,
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2980b9',
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    color: '#34495e',
    lineHeight: 24,
    marginTop: 8,
  },
  textBold: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginTop: 10,
  },
  iconLarge: {
    fontSize: 30,
    color: '#16a085',
    marginBottom: 8,
  },
  iconSmall: {
    fontSize: 20,
    color: '#e74c3c',
    marginBottom: 4,
  },
});
