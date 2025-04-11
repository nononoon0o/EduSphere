import { View, Text, ScrollView, StyleSheet } from 'react-native';

export const subtitle = "04 날씨의 변화";

export default function Chapter2_04() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.subtitle}>{subtitle}</Text>
      
      <Text style={styles.text}>
        날씨 변화는 단순히 기온이나 비가 내리는 정도를 넘어서, 자연현상과 인간 활동에 미치는 영향을 다각도로 이해해야 합니다. 날씨 변화는 지구의 대기와 상호작용하는 다양한 요소들의 복합적인 결과입니다. 이 장에서는 날씨 변화가 어떻게 발생하는지, 왜 그것이 중요한지, 그리고 날씨 변화가 인간과 자연에 미치는 심오한 영향을 더 깊이 탐구해보겠습니다.
      </Text>

      <Text style={styles.header}>1. 날씨 변화의 과학적 원리</Text>
      <Text style={styles.text}>
        날씨는 주로 **대기층** 내의 물리적, 화학적 상호작용에 의해 결정됩니다. 대기는 지구 표면에서부터 대기권의 상단까지 다양한 층으로 나누어집니다. 각 층은 온도, 습도, 기압 등에 따라 다르게 변하며, 이들이 서로 상호작용하면서 날씨를 만듭니다. 날씨의 변화를 이해하려면 **기온**, **기압**, **습도**, **바람** 등 네 가지 주요 요소와 그들의 관계를 이해해야 합니다.
      </Text>
      
      <Text style={styles.subHeader}>기온 (Temperature)</Text>
      <Text style={styles.text}>
        기온은 대기의 온도를 측정하는 값으로, 기후와 날씨 변화를 예측하는 데 중요한 요소입니다. 기온이 높으면 공기가 팽창하고, 낮으면 공기가 수축합니다. 이는 기압의 변화를 일으켜 바람과 날씨 패턴에 영향을 미칩니다. 예를 들어, 고온은 상층 공기를 상승시켜 구름이 형성되는 원인이 될 수 있습니다.
      </Text>

      <Text style={styles.subHeader}>기압 (Pressure)</Text>
      <Text style={styles.text}>
        기압은 대기의 무게에 의한 압력으로, 날씨 변화를 예측하는 데 중요한 역할을 합니다. 기압이 높은 지역은 보통 맑은 날씨를 보이며, 기압이 낮은 지역은 구름과 비를 동반하는 경우가 많습니다. 저기압과 고기압 시스템은 각각 **상승 기류**와 **하강 기류**를 형성하며, 이는 강수와 바람의 패턴에 직접적인 영향을 미칩니다.
      </Text>

      <Text style={styles.subHeader}>습도 (Humidity)</Text>
      <Text style={styles.text}>
        습도는 대기 중에 존재하는 수증기의 양을 의미합니다. 습도가 높을수록 공기는 더욱 무겁고, 구름 형성이 더 쉽게 일어납니다. 높은 습도는 또한 강수나 안개를 유발할 수 있습니다. 대기의 수증기는 기온이 낮아지면 응결하여 구름을 형성하고, 그 결과 비나 눈이 내리게 됩니다.
      </Text>

      <Text style={styles.subHeader}>바람 (Wind)</Text>
      <Text style={styles.text}>
        바람은 대기 중에서 공기의 흐름을 말하며, 기온, 기압, 습도 차이에 의해 발생합니다. 바람은 온도나 기압의 불균형을 해소하는 역할을 하며, 바람의 방향과 속도는 날씨를 예측하는 데 중요한 단서를 제공합니다. 예를 들어, 동쪽에서 서쪽으로 불어오는 바람은 **북반구에서** 일반적으로 차가운 기후를 가져오며, 이 바람의 변화를 통해 날씨를 예측할 수 있습니다.
      </Text>

      <Text style={styles.header}>2. 날씨 변화의 예측과 모델링</Text>
      <Text style={styles.text}>
        기상학자들은 날씨 변화를 예측하기 위해 다양한 기상 관측 데이터를 사용합니다. 이러한 예측 모델은 수학적 알고리즘과 컴퓨터 시뮬레이션을 통해 이루어지며, 시간에 따라 발생할 수 있는 날씨 패턴을 모델링합니다. 이 과정에서 중요한 두 가지 기술은 **수치 예보 모델**(Numerical Weather Prediction, NWP)과 **기상 위성**입니다.
      </Text>

      <Text style={styles.subHeader}>수치 예보 모델 (NWP)</Text>
      <Text style={styles.text}>
        수치 예보 모델은 대기와 해양의 상태를 수학적으로 모델링하여 미래의 날씨를 예측합니다. 기상 관측소, 위성, 레이더 등의 데이터를 입력으로 받아 대기의 흐름을 계산하고, 이를 기반으로 몇 시간, 며칠 후의 날씨를 예측합니다. 현대의 수치 예보 모델은 고도의 컴퓨팅 파워를 요구하지만, 정확한 예측을 가능하게 합니다.
      </Text>

      <Text style={styles.subHeader}>기상 위성 (Weather Satellites)</Text>
      <Text style={styles.text}>
        위성은 지구의 대기와 표면을 관측하는 데 사용됩니다. 위성은 기온, 구름, 강수, 바람 등의 정보를 실시간으로 제공하며, 이를 통해 날씨 패턴을 추적하고 예측할 수 있습니다. 특히, 기상 위성은 태풍이나 폭풍 시스템을 실시간으로 추적할 수 있어 자연 재해를 예측하고 대비하는 데 중요한 역할을 합니다.
      </Text>

      <Text style={styles.header}>3. 날씨 변화가 인간과 환경에 미치는 영향</Text>
      <Text style={styles.text}>
        날씨 변화는 인간 사회와 자연 환경에 많은 영향을 미칩니다. 인간은 날씨에 적응하여 생활을 하지만, 기후 변화나 극단적인 날씨는 그 영향을 크게 받을 수 있습니다. 이러한 영향은 여러 분야에서 구체적으로 나타납니다.
      </Text>

      <Text style={styles.subHeader}>농업</Text>
      <Text style={styles.text}>
        날씨 변화는 농작물의 생산에 매우 중요한 영향을 미칩니다. 예를 들어, 갑작스런 기온 변화나 비의 양에 따라 농작물의 생장 속도와 수확량이 달라질 수 있습니다. 특히, 가뭄이나 홍수와 같은 극단적인 날씨는 농업에 치명적인 영향을 미칠 수 있습니다.
      </Text>

      <Text style={styles.subHeader}>교통</Text>
      <Text style={styles.text}>
        날씨 변화는 교통 시스템에 중요한 영향을 미칩니다. 눈, 비, 안개 등은 도로의 안전성을 저하시킬 수 있으며, 이는 교통사고를 유발할 수 있습니다. 또한, 강풍이나 폭풍우는 항공기 운항에도 큰 영향을 미칩니다. 기상청의 예보를 통해 교통에 미치는 영향을 최소화할 수 있습니다.
      </Text>

      <Text style={styles.subHeader}>재난 관리</Text>
      <Text style={styles.text}>
        기후 변화로 인한 자연 재해는 인간과 환경에 치명적인 영향을 미칠 수 있습니다. 태풍, 폭우, 홍수, 산사태, 가뭄 등은 그 지역의 경제와 생활에 큰 타격을 줍니다. 기상 예측과 빠른 대처를 통해 인명 피해를 줄일 수 있으며, 재난 관리에서 날씨 예측은 매우 중요한 역할을 합니다.
      </Text>

      <Text style={styles.subHeader}>기후 변화</Text>
      <Text style={styles.text}>
        기후 변화는 장기적인 날씨의 변화를 의미합니다. 기후 변화는 온실가스의 증가, 해양 온도의 상승, 빙하의 융해 등으로 인해 발생하며, 이는 지구 전체의 날씨 패턴에 영향을 미칩니다. 기후 변화는 농업, 식수, 해양 생태계 등 여러 영역에 영향을 미치며, 전 세계적인 대처가 필요합니다.
      </Text>

      <Text style={styles.header}>4. 결론</Text>
      <Text style={styles.text}>
        날씨의 변화는 자연현상에서 중요한 역할을 하며, 이를 이해하고 예측하는 것은 우리의 삶에 중요한 영향을 미칩니다. 날씨 변화의 과학적 원리를 이해하고, 예측 기술을 활용하여 극단적인 날씨 현상에 대비하는 것이 중요합니다. 또한, 날씨 변화가 인간 활동과 환경에 미치는 영향을 파악하고, 기후 변화에 적응할 수 있는 방법을 모색하는 것이 필요합니다. 날씨 변화에 대한 지식은 단순한 관심을 넘어서, 우리가 더 나은 미래를 만들어 나가는 데 필수적인 요소입니다.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f9f9f9',
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
