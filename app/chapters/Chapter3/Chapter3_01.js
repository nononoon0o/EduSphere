import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const subtitle = "01 물질 변화와 화학 반응식";

export default function Chapter3_01() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.subtitle}>{subtitle}</Text>

      {/* Introduction */}
      <View style={styles.sectionWrapper}>
        <Icon name="info" style={styles.iconLarge} />
        <Text style={styles.text}>
          이 단원에서는 물질이 어떻게 변화하고, 그 변화를 화학 반응식으로 표현하는 방법을 배웁니다.
          물질 변화는 화학뿐만 아니라 제조, 환경과학, 의학 등 여러 분야에서 중요합니다.
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

      {/* 물리적 변화 (Physical Changes) */}
      <View style={styles.sectionWrapper}>
        <Icon name="sync" style={styles.iconSmall} />
        <Text style={styles.subsectionTitle}>1.1 물리적 변화 (Physical Changes)</Text>
        <Text style={styles.text}>
          물리적 변화는 물질의 상태나 모양이 바뀌지만 화학적 성질은 변하지 않는 변화입니다. 예시로는 얼음이 물로 변하는 것과 물이 증기로 변하는 것 등이 있습니다. 이 변화들은 대부분 되돌릴 수 있습니다.
        </Text>
      </View>

      {/* 화학적 변화 (Chemical Changes) */}
      <View style={styles.sectionWrapper}>
        <Icon name="autorenew" style={styles.iconSmall} />
        <Text style={styles.subsectionTitle}>1.2 화학적 변화 (Chemical Changes)</Text>
        <Text style={styles.text}>
          화학적 변화는 물질이 변하여 새로운 물질이 형성되는 과정입니다. 이 변화는 원자나 분자의 재배열을 포함합니다. 예시로는 연소, 산화, 소화 등이 있습니다. 화학적 변화는 대개 되돌릴 수 없습니다.
        </Text>
      </View>

      {/* 화학 반응식 (Chemical Equations) */}
      <View style={styles.sectionWrapper}>
        <Icon name="functions" style={styles.iconLarge} />
        <Text style={styles.sectionTitle}>2. 화학 반응식 (Chemical Equations)</Text>
        <Text style={styles.text}>
          화학 반응은 반응물과 생성물, 그리고 그들의 비율을 화학 반응식으로 나타냅니다. 이는 질량 보존 법칙을 따릅니다.
        </Text>
      </View>

      {/* 구성 요소 (Components of Chemical Equations) */}
      <View style={styles.sectionWrapper}>
        <Icon name="list" style={styles.iconSmall} />
        <Text style={styles.subsectionTitle}>화학 반응식의 주요 구성 요소</Text>
        <Text style={styles.text}>
          - **Reactants (반응물)**: 반응물이 화학 반응을 통해 변하는 물질들입니다.
          - **Products (생성물)**: 반응 후 형성되는 새로운 물질들입니다.
          - **Coefficients (계수)**: 반응물 및 생성물의 분자 수를 나타내는 숫자입니다.
          - **State Symbols (상태 기호)**: 물질의 상태를 나타내는 기호로, (s) 고체, (l) 액체, (g) 기체, (aq) 수용액이 있습니다.
        </Text>
        <Text style={styles.text}>
          예시로는 다음과 같습니다:
        </Text>
        <Text style={styles.textBold}>
          2H₂O (l) → 2H₂ (g) + O₂ (g)
        </Text>
      </View>

      {/* 화학 반응식 균형 맞추기 (Balancing Chemical Equations) */}
      <View style={styles.sectionWrapper}>
        <Icon name="scale" style={styles.iconSmall} />
        <Text style={styles.subsectionTitle}>2.2 화학 반응식 균형 맞추기 (Balancing Chemical Equations)</Text>
        <Text style={styles.text}>
          화학 반응식은 질량 보존 법칙을 따라 반응물과 생성물에서 각 원소의 원자가 같아야 합니다. 예를 들어, 메탄의 연소 반응은 다음과 같습니다:
        </Text>
        <Text style={styles.textBold}>
          CH₄ (g) + 2O₂ (g) → CO₂ (g) + 2H₂O (g)
        </Text>
      </View>

      {/* 화학 반응의 에너지 변화 (Energy Changes in Reactions) */}
      <View style={styles.sectionWrapper}>
        <Icon name="power" style={styles.iconSmall} />
        <Text style={styles.subsectionTitle}>2.4 화학 반응의 에너지 변화 (Energy Changes in Reactions)</Text>
        <Text style={styles.text}>
          화학 반응은 에너지 변화를 동반합니다. 일부 반응은 에너지를 방출하고(발열 반응), 일부는 에너지를 흡수합니다(흡열 반응).
        </Text>
      </View>

      {/* Conclusion */}
      <View style={styles.sectionWrapper}>
        <Icon name="check-circle" style={styles.iconLarge} />
        <Text style={styles.text}>
          이 단원에서는 화학 반응과 물질 변화가 단지 이론적인 개념이 아니라 자연과 기술 세계에서 중요한 과정임을 배웁니다. 화학 반응식과 그 균형 맞추기, 그리고 다양한 반응 유형을 이해함으로써 우리는 화학적 상호작용의 역학에 대한 통찰을 얻을 수 있습니다.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9', // Light background color for better readability
  },
  subtitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c3e50',  // Darker color for subtitle for better contrast
    marginBottom: 15,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 15, // Vertical margin between sections for spacing
  },
  icon: {
    marginRight: 10,  // Space between icon and text
  },
  text: {
    fontSize: 16,
    color: '#34495e',  // Dark grey for easy reading
    lineHeight: 24,  // Better readability with line height
    flex: 1,  // Ensures text fills available space
  },
  textBold: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',  // Bold text for emphasis
    marginTop: 5, // Adds some spacing between sections
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2980b9',  // Blue for section headers to stand out
    marginTop: 20,
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: '600',  // Semi-bold for subtitled text
    color: '#2980b9',  // Same color as sectionTitle for consistency
    marginTop: 10,
  },
  // Optional styles for ScrollView content
  scrollContent: {
    paddingBottom: 20, // Ensures there's padding at the bottom
  },
  iconLarge: {
    fontSize: 30, // Bigger icon size for main sections
    color: '#16a085',  // Soft green color for main sections' icons
  },
  iconSmall: {
    fontSize: 20,  // Smaller icon size for subsections
    color: '#e74c3c',  // Red color for subsection icons
  },
  sectionWrapper: {
    marginTop: 20,
    paddingLeft: 15,  // Adds padding to make text aligned well with the icon
    paddingRight: 15,
  }
});
