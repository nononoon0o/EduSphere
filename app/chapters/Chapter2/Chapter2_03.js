import { View, Text, ScrollView } from 'react-native';
import { FontAwesome } from 'react-native-vector-icons';

export const subtitle = "03 기압과 바람";

export default function Chapter2_03() {
  return (
    <ScrollView style={styles.container}>
      {/* Title */}
      <Text style={styles.subtitleText}>
        {subtitle}
      </Text>
      
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
        기압은 기체가 일정 공간 내에서 분자들이 충돌하는 힘의 총합을 의미합니다. 기압은 기체 분자들이 벽에 부딪히면서 발생하는 힘에 의해 결정되며, 일반적으로 파스칼(Pa), 기압(atm), 혹은 밀리미터 수은주(mmHg)로 측정됩니다.
        {"\n\n"}- 기압은 화학 반응에서 기체 반응물의 부피나 반응 속도에 영향을 미칩니다.
        {"\n"}- 보일의 법칙과 찰스의 법칙에 따라 기압과 부피, 온도는 서로 밀접한 관계를 갖고 있습니다.
        {"\n\n"}<Text style={styles.boldText}>기체의 부피 비율</Text>
        {"\n\n"}기체 반응에서 부피 비율은 일정한 기압과 온도에서 중요한 역할을 합니다. 기체들이 반응할 때, 그들의 부피 비율은 간단한 수학적 관계로 나타낼 수 있습니다.
        {"\n\n"}- 아보가드로의 법칙은 기체가 동일한 온도와 기압에서 동일 부피를 가지면 같은 수의 분자를 포함한다고 설명합니다.
      </Text>

      {/* Wind Section */}
      <View style={styles.sectionHeader}>
        <FontAwesome name="cloud" size={20} style={styles.icon} />
        <Text style={[styles.paragraphText, styles.boldText]}>2. 바람 (Wind)</Text>
      </View>
      <Text style={styles.paragraphText}>
        바람은 대기 중의 기체가 고온에서 저온으로 이동하는 현상입니다. 바람은 기압의 차이에 의해 발생하며, 이 차이로 인해 공기가 이동하면서 풍향과 풍속이 결정됩니다.
        {"\n\n"}- 기압 차이가 바람의 세기와 방향을 결정합니다.
        {"\n"}- 지구의 자전으로 인해 바람은 코리올리 효과로 방향이 휘어집니다.
        {"\n\n"}<Text style={styles.boldText}>기압과 바람의 관계</Text>
        {"\n\n"}기압이 높은 지역에서 낮은 지역으로 공기가 이동하는데, 이때 발생하는 힘이 바로 바람입니다. 바람은 기체의 압력 차이에 따라 그 세기와 방향이 달라집니다.
      </Text>

      {/* Chemical Reaction Section */}
      <View style={styles.sectionHeader}>
        <FontAwesome name="flask" size={20} style={styles.icon} />
        <Text style={[styles.paragraphText, styles.boldText]}>3. 화학 반응에서 기체와 에너지의 교환</Text>
      </View>
      <Text style={styles.paragraphText}>
        기체 반응에서는 기압과 온도가 중요한 역할을 하며, 기체의 부피 비율을 통해 반응을 예측할 수 있습니다. 화학 반응에서의 에너지 흐름은 열을 포함한 에너지의 형태로 주고받게 되며, 이는 주로 열역학의 법칙에 의해 설명됩니다.
        {"\n\n"}- 화학 반응에서 기체가 반응할 때 열에너지가 방출되거나 흡수됩니다.
        {"\n"}- 엔탈피 변화는 기체 반응의 열적 특성을 이해하는 데 중요합니다.
        {"\n\n"}<Text style={styles.boldText}>기체 반응에서의 에너지 전달</Text>
        {"\n\n"}화학 반응에서의 에너지 흐름은 주로 열, 빛, 전기와 같은 형태로 발생합니다. 기체가 팽창하거나 압축될 때 열 에너지가 발생하거나 소모됩니다.
        {"\n\n"}- 연료가 연소할 때 발생하는 에너지를 예측하고 관리하는 데 기체의 부피와 압력의 변화가 중요한 역할을 합니다.
      </Text>

      {/* Conclusion Section */}
      <View style={styles.sectionHeader}>
        <FontAwesome name="check-circle" size={20} style={styles.icon} />
        <Text style={[styles.paragraphText, styles.boldText]}>결론</Text>
      </View>
      <Text style={styles.paragraphText}>
        기압과 바람은 화학 반응과 기체의 행동을 이해하는 데 중요한 역할을 합니다. 기체 반응에서의 부피 비율은 기압과 온도에 따라 달라지며, 이를 통해 다양한 화학 반응을 예측하고 분석할 수 있습니다. 또한, 화학 반응 중 에너지가 어떻게 주고받는지에 대한 이해는 화학 공정에서 중요한 역할을 합니다.
      </Text>
    </ScrollView>
  );
}

// Define constant styles
const styles = {
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F7F9FC',
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
};

