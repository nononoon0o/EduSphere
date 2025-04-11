import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export const subtitle = '01. 물질 변화와 화학 반응식';

export default function Chapter1_01() {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <FontAwesome5 name="flask" size={22} color="#2980b9" style={{ marginRight: 10 }} />
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>

      <Text style={styles.description}>
        우리 주변의 물질들은 가만히 있지 않고 끊임없이 변하고 있습니다. 예를 들어 얼음은 녹고, 물은 증발하며, 철은 녹슬기도 합니다. 이번 단원에서는 이러한 변화를 구분하고, 화학에서 가장 필수적인 언어 중 하나인 화학 반응식의 표현 방법을 배워봅시다.
      </Text>

      <TouchableOpacity onPress={() => navigation.navigate('GameScreen')}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔬 핵심 개념 요약 (Game)</Text>
          <Text style={styles.paragraph}>
            화학 반응은 물질이 다른 물질로 변화하는 현상입니다. 예를 들어 철에 녹이 스는 것, 종이가 타는 것 등은 모두 화학 변화입니다. 이러한 변화는 화학 반응식으로 표현되며, 반응 전의 물질은 "반응물", 반응 후의 물질은 "생성물"이라 부릅니다.
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('InventoryScreen')}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📦 핵심 개념 요약 (Inventory)</Text>
          <Text style={styles.paragraph}>
            예를 들어, 수소와 산소가 반응하여 물이 되는 반응은 다음과 같이 표현됩니다:
          </Text>
          <Text style={styles.reaction}>2H₂ + O₂ → 2H₂O</Text>
          <Text style={styles.paragraph}>
            이 화학 반응식은 반응물과 생성물 사이의 관계와 개수를 보여줍니다.
          </Text>
          <Text style={styles.paragraph}>
          이 화학 반응식은 반응물과 생성물 사이의 관계와 개수를 보여줍니다. 또한 질량 보존의 법칙에 따라 반응 전과 후의 원자 수는 같습니다.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📘 물리 변화 vs 화학 변화</Text>
        <Text style={styles.paragraph}>물리 변화는 물질의 고유한 성질은 변하지 않고, 모양이나 상태만 변하는 현상입니다.</Text>
        <Text style={styles.paragraph}>예) 얼음과 물은 상태는 다르지만, 동일한 물 분자로 이루어져 있습니다.</Text>
        <Text style={styles.bullet}>• 모양/크기 변화: 종이를 자르거나 유리를 깨는 것.</Text>
        <Text style={styles.bullet}>• 상태 변화: 물이 얼거나 끓는 것.</Text>
        <Text style={styles.bullet}>• 확산/용해: 잉크가 물에 퍼지거나 설탕이 물에 녹는 현상.</Text>
        <Text style={styles.paragraph}>화학 변화는 물질이 성질이 전혀 다른 새로운 물질로 바뀌는 현상입니다. 분자 내부의 원자 배열이 변화하면서, 원래 물질과는 완전히 다른 물질이 생성됩니다.</Text>
        <Text style={styles.bullet}>• 연소 반응: 양초가 타면서 이산화탄소와 물이 생성됨</Text>
        <Text style={styles.bullet}>• 부식 반응: 철이 녹슬어 산화철이 생성됨</Text>
        <Text style={styles.bullet}>• 부패/발효: 과일이 썩거나 김치가 익는 현상</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🧪 화학 반응식</Text>
        <Text style={styles.paragraph}>화학 반응이란 화학 변화가 일어나는 과정이며, 원자의 종류와 개수는 변하지 않고, 원자 배열이 바뀌어 새로운 물질이 생성됩니다.</Text>
        <Text style={styles.paragraph}>반응 전 물질은 반응물, 반응 후 물질은 생성물이라고 부릅니다.</Text>
        <Text style={styles.reaction}>CH₄ + 2O₂ → CO₂ + 2H₂O</Text>
        <Text style={styles.paragraph}>화학 반응식은 기호와 숫자를 통해 반응물과 생성물의 관계를 수량적으로 나타냅니다.</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📊 기타 표시법</Text>
        <Text style={styles.bullet}>• 상태 표시: 고체(s), 액체(l), 기체(g), 수용액(aq)</Text>
        <Text style={styles.bullet}>• 기호: ↑(기체 발생), ↓(앙금 생성)</Text>
        <Text style={styles.bullet}>• 반응 조건: Δ(가열), 촉매 등의 조건 화살표 위 아래에 표시</Text>
        <Text style={styles.bullet}>• 에너지 변화: 발열(+), 흡열(–)</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔎 마무리 정리</Text>
        <Text style={styles.paragraph}>이 단원에서는 화학 변화의 개념과 이를 나타내는 화학 반응식에 대해 배웠습니다. 물질의 상태 변화와 새로운 물질 형성의 차이를 이해하고, 반응식의 구성 요소, 질량 보존의 법칙 등을 통해 실제로 일어나는 반응들을 설명할 수 있게 됩니다.</Text>
      </View>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f9fcff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  description: {
    fontSize: 16,
    color: '#34495e',
    marginBottom: 20,
    lineHeight: 22,
  },
  section: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#eaf2ff',
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2e86de',
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 15,
    color: '#2c3e50',
    lineHeight: 22,
    marginBottom: 6,
  },
  reaction: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#e67e22',
    textAlign: 'center',
    marginVertical: 10,
  },
});
