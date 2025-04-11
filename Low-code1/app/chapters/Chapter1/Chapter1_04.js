import React from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const subtitle = "04 (날씨의 변화)";

export default function Chapter1_04() {
  return (
    <ImageBackground
      source={{ uri: 'https://example.com/your-background-image.jpg' }} // Replace with your image URL or local image path
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <Ionicons name="book" size={30} color="#007AFF" style={styles.icon} />
          <Text style={styles.title}>{subtitle}</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.introText}>
            날씨의 변화와 기후 변화는 여러 요인에 의해 발생하며, 이는 대기, 지리적 요소 및 인간 활동에 의해 영향을 받습니다. 
            이 단원에서는 기후와 날씨의 역학을 자세히 살펴보겠습니다.
          </Text>

          <View style={styles.section}>
            <Ionicons name="thermometer" size={24} color="#007AFF" style={styles.sectionIcon} />
            <Text style={styles.sectionTitle}>1. 기후 및 날씨의 주요 요인</Text>
            <Text style={styles.text}>
              <Text style={styles.boldText}>a. 온도</Text>{"\n"}
              대기의 온도는 날씨를 결정하는 가장 중요한 요소 중 하나입니다. 태양에서 받는 에너지와 이 에너지가 대기에서 재분배되는 방식에 따라 결정됩니다. 
              온도는 계절, 위도, 고도 및 해양 흐름에 따라 달라집니다.
            </Text>
            <Text style={styles.text}>
              <Text style={styles.boldText}>b. 대기압</Text>{"\n"}
              대기압은 공기가 가하는 힘으로, 고도와 기상 조건에 따라 달라집니다. 고기압 지역은 일반적으로 맑고 건조한 날씨와 관련이 있으며, 저기압 지역은 흐림과 비, 폭풍과 관련이 있습니다.
            </Text>
            <Text style={styles.text}>
              <Text style={styles.boldText}>c. 습도 및 강수량</Text>{"\n"}
              공기의 습도는 대기 중의 수증기 양을 의미합니다. 습도가 높을수록 강수가 발생할 가능성이 높아집니다. 
              기온이 상승하면 수증기 응결이 발생하고, 이는 구름을 형성하여 강수를 유발할 수 있습니다.
            </Text>
          </View>

          <View style={styles.section}>
            <Ionicons name="rainy" size={24} color="#007AFF" style={styles.sectionIcon} />
            <Text style={styles.sectionTitle}>2. 기후 변화</Text>
            <Text style={styles.text}>
              기후 변화는 주로 인간 활동으로 인한 장기적인 기상 패턴의 변화를 의미합니다. 
              <Text style={styles.boldText}>온실 효과</Text>는 자연적인 현상으로, 특정 가스가 대기에서 열을 가두어 지구의 온도를 유지하게 합니다. 
              하지만 인간 활동으로 인해 이러한 온실가스의 농도가 증가하고 있습니다.
            </Text>

            <Text style={styles.text}>
              <Text style={styles.boldText}>변화의 영향</Text>{"\n"}
              - 극단적인 기상 현상: 기온 상승은 열파, 폭풍, 홍수, 가뭄과 같은 극단적인 날씨를 유발합니다.{"\n"}
              - 빙하의 녹음과 해수면 상승: 지구 온난화는 빙하와 얼음의 녹음을 촉진하여 해수면 상승을 초래합니다.{"\n"}
              - 농업 피해: 강수 패턴의 변화는 농작물 생산에 부정적인 영향을 미칠 수 있습니다.{"\n"}
              - 기후 난민: 극단적인 기상 현상은 사람들을 이주하게 할 수 있으며, 이는 사회적 문제를 일으킬 수 있습니다.
            </Text>
          </View>

          <View style={styles.section}>
            <Ionicons name="cloud" size={24} color="#007AFF" style={styles.sectionIcon} />
            <Text style={styles.sectionTitle}>3. 기상 예측과 기후 모델</Text>
            <Text style={styles.text}>
              기상 예측은 실시간 기상 관측(위성, 레이더)과 복잡한 컴퓨터 모델을 기반으로 합니다. 
              이러한 모델은 대기의 변화를 시뮬레이션하여 단기 및 장기 날씨를 예측합니다.
            </Text>
          </View>

          <View style={styles.section}>
            <Ionicons name="globe" size={24} color="#007AFF" style={styles.sectionIcon} />
            <Text style={styles.sectionTitle}>4. 인간의 역할</Text>
            <Text style={styles.text}>
              인간의 활동은 기후 변화에 중대한 영향을 미칩니다. 산업, 교통, 농업, 산림 벌채 등에서 발생하는 온실가스 배출은 지구의 온도를 상승시키고 있습니다. 
              CO2 배출 감소, 청정 기술 도입, 재조림 등은 기후 변화의 영향을 완화하기 위한 중요한 조치입니다.
            </Text>
          </View>

          <View style={styles.section}>
            <Ionicons name="checkmark-circle" size={24} color="#007AFF" style={styles.sectionIcon} />
            <Text style={styles.sectionTitle}>결론</Text>
            <Text style={styles.text}>
              날씨와 기후의 변화를 이해하는 것은 미래의 기상 조건에 더 잘 대비하고 지구를 보호하기 위한 조치를 취하는 데 도움이 됩니다. 
              과학은 계속 발전하고 있으며, 우리의 행동이 기후에 미치는 영향을 이해하는 것이 점점 더 중요해지고 있습니다.
            </Text>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover', // Ensures the background image covers the entire screen
    justifyContent: 'center',
  },
  contentContainer: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent white background to make text readable
    borderRadius: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    backgroundColor: 'transparent', // Keeps content background transparent
  },
  introText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionIcon: {
    marginRight: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    marginBottom: 10,
  },
  boldText: {
    fontWeight: 'bold',
  },
});
