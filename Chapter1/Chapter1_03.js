import React from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Icon library

export const subtitle = "03 기체 반응 법칙, 화학 반응에서의 에너지 출입";

export default function Chapter1_03() {
  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://your-image-url.com' }} // Add a subtle background image if you'd like
        style={styles.backgroundImage}
      >
        <View style={styles.header}>
          <Text style={styles.title}>{subtitle}</Text>
          <Text style={styles.introText}>
            기체 반응에서의 부피 비율과 화학 반응 중 에너지가 어떻게 주고받는지 알아봅니다. 이 장에서는 기체 반응에서의 부피 비율과 화학 반응 중 에너지 교환에 대해 깊이 있게 다룹니다.
          </Text>
        </View>
      </ImageBackground>

      <View style={styles.section}>
        <Ionicons name="flame" size={24} color="#FF6347" />
        <Text style={styles.sectionTitle}>1. 기체 반응에서의 부피 비율</Text>
        <Text style={styles.text}>
          기체 반응에 대한 법칙은 기체가 일정한 온도와 압력에서 반응할 때, 그 부피 비율이 간단한 정수 비율로 나타나는 것을 설명합니다. 이는 조제프 게이뤼삭의 기체 결합 법칙에 의해 제시된 것으로, 예를 들어 수소와 산소가 반응하여 물을 만들 때 두 개의 수소 분자가 한 개의 산소 분자와 결합해 물 두 분자가 형성되는 관계를 보여줍니다.
        </Text>
      </View>

      <View style={styles.section}>
        <Ionicons name="battery-charging" size={24} color="#00BFFF" />
        <Text style={styles.sectionTitle}>2. 화학 반응에서의 에너지 출입</Text>
        <Text style={styles.text}>
          화학 반응은 보통 에너지의 변화를 동반하며, 이 에너지는 주로 열 또는 빛의 형태로 전달됩니다. 화학 반응은 일반적으로 발열 반응(에너지를 방출)과 흡열 반응(에너지를 흡수)으로 분류할 수 있습니다. 발열 반응은 에너지를 방출하여 주변 환경에 열을 전달하고, 흡열 반응은 에너지를 흡수하여 반응이 진행되도록 합니다. 예를 들어, 메탄의 연소 반응은 발열 반응에 해당하며, 광합성은 흡열 반응입니다.
        </Text>
      </View>

      <View style={styles.section}>
        <Ionicons name="flash" size={24} color="#FFD700" />
        <Text style={styles.sectionTitle}>3. 활성화 에너지와 반응 경로</Text>
        <Text style={styles.text}>
          반응이 진행되기 위해서는 활성화 에너지가 필요합니다. 이는 반응물의 결합을 끊고 새로운 결합을 형성하기 위해 필요한 에너지로, 이 에너지가 충분히 공급되면 반응이 일어날 수 있습니다. 활성화 에너지의 개념은 화학 반응이 어떻게 진행되고 왜 특정 반응이 더 빨리 일어나는지 이해하는 데 중요합니다.
        </Text>
      </View>

      <View style={styles.section}>
        <Ionicons name="calculator" size={24} color="#32CD32" />
        <Text style={styles.sectionTitle}>4. 이상 기체 법칙 및 실제 기체 행동</Text>
        <Text style={styles.text}>
          이상 기체 법칙은 기체의 거동을 설명하는 중요한 공식입니다. 이 법칙은 기체의 압력, 부피, 온도 및 몰 수 간의 관계를 설명하며, 실제 기체가 이상 기체로 간주되는 조건을 이해하는 데 도움을 줍니다. 하지만 실제 기체는 이상 기체 법칙에서 예측하는 것과는 다르게 행동할 수 있습니다. 이러한 오차를 설명하기 위해 반 데르 발스 방정식이 사용됩니다.
        </Text>
      </View>

      <View style={styles.section}>
        <Ionicons name="thermometer" size={24} color="#FF4500" />
        <Text style={styles.sectionTitle}>5. 에너지 전달의 화학 반응에서의 역할</Text>
        <Text style={styles.text}>
          화학 반응에서의 에너지 출입은 주로 발열 반응과 흡열 반응으로 나눌 수 있습니다. 발열 반응은 주변 환경에 에너지를 방출하고, 흡열 반응은 반응을 지속시키기 위해 에너지를 흡수합니다. 이러한 에너지의 전달은 여러 가지 화학적 및 산업적 과정에서 중요한 역할을 합니다. 예를 들어, 화석 연료의 연소와 같은 발열 반응은 많은 에너지를 발생시킵니다.
        </Text>
      </View>

      <View style={styles.section}>
        <Ionicons name="time" size={24} color="#8A2BE2" />
        <Text style={styles.sectionTitle}>6. 촉매와 활성화 에너지</Text>
        <Text style={styles.text}>
          촉매는 반응의 활성화 에너지를 낮추어 주는 물질입니다. 촉매는 반응 경로를 변경시켜서 더 적은 에너지로 반응이 진행되도록 만듭니다. 이는 화학 공정에서 매우 중요한 역할을 하며, 반응의 효율성을 높이고, 특정 온도에서 반응을 빠르게 일으킬 수 있게 합니다.
        </Text>
      </View>

      <View style={styles.section}>
        <Ionicons name="globe" size={24} color="#3CB371" />
        <Text style={styles.sectionTitle}>7. 기체 법칙과 에너지 전달의 실용적 적용</Text>
        <Text style={styles.text}>
          기체 법칙과 에너지 전달 원리는 다양한 산업 분야에서 매우 중요한 역할을 합니다. 화학 공정에서 기체 반응을 최적화하고, 환경 과학에서 온실가스와 그들의 영향을 모델링하는 데 필요합니다. 또한, 에너지 저장 및 지속 가능한 기술 개발에 중요한 기초 지식을 제공합니다.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    borderRadius: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.2)', // Subtle overlay for text readability
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'Poppins', // Custom font for title
  },
  introText: {
    marginTop: 10,
    fontSize: 16,
    color: '#fff', // White text on dark background
    lineHeight: 24,
    fontFamily: 'Roboto', // Custom font for body text
  },
  section: {
    marginVertical: 20,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius : 4,
    shadowOffset: { width: 0, height: 2 },
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    fontFamily: 'Roboto', // Custom font for body text
  },
});
