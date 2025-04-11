import { View, Text, ScrollView, StyleSheet } from 'react-native';

export const subtitle = "02 질량 보존 법칙, 일정 성분비 법칙";

export default function Chapter2_02() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.subtitle}>{subtitle}</Text>
      
      <Text style={styles.description}>
        화학 반응에서 질량이 보존되는 원리와, 일정한 비율로 성분이 결합하는 법칙을 배웁니다.
      </Text>
      
      <Text style={styles.sectionTitle}>1. 질량 보존 법칙 (Law of Conservation of Mass)</Text>
      <Text style={styles.text}>
        질량 보존 법칙은 "화학 반응이 일어날 때, 반응에 참여하는 물질의 질량의 총합은 변하지 않으며, 새로운 물질을 형성할 때 그 질량은 일정하게 유지된다"는 원칙입니다. 
        이 법칙은 18세기 프랑스의 화학자 **앙투안 라부아지에**에 의해 발견되었습니다.
      </Text>
      
      <Text style={styles.text}>
        주요 내용:
        {"\n"}- 화학 반응 전후의 질량은 동일: 예를 들어, 물질이 결합하거나 분해되는 과정에서, 반응물의 질량은 생성물의 질량과 정확히 같아야 합니다.
        {"\n"}- 질량의 변화는 화학 반응 내에서만 일어남: 화학 반응 외적인 물리적 변화에서는 질량이 보존됩니다. (예: 얼음이 물로 녹을 때, 물의 질량은 변하지 않음)
        {"\n"}- 실험적 증거: 라부아지에는 고정된 용기에 물질들을 넣고 화학 반응을 일으켰을 때, 반응 전후의 질량 차이가 없음을 실험적으로 증명했습니다.
      </Text>
      
      <Text style={styles.text}>
        화학 반응 예시:
        {"\n"}- 수소와 산소의 결합 반응 (물의 생성):
        {"\n"}  2H₂ + O₂ → 2H₂O
        {"\n"}  이 반응에서 수소와 산소의 질량이 결합하여 물이 생성되며, 생성된 물의 질량은 수소와 산소의 질량의 합과 같습니다.
      </Text>

      <Text style={styles.text}>
        의의:
        {"\n"}- 화학 반응의 예측 가능성: 질량이 보존된다는 원리는 화학 반응에서 물질의 비율을 예측하는 데 매우 중요합니다.
        {"\n"}- 환경과 안전: 화학 반응에서 물질의 질량이 보존된다는 사실은 실험실 안전과 화학 산업에서 매우 중요한 개념입니다. 특히 유독한 물질의 질량이 변하지 않으므로, 반응 후 잔여 물질의 처리가 중요합니다.
      </Text>
      
      <Text style={styles.sectionTitle}>2. 일정 성분비 법칙 (Law of Definite Proportions)</Text>
      <Text style={styles.text}>
        일정 성분비 법칙은 "화학 물질이 반응하여 새로운 물질을 형성할 때, 각 성분의 비율은 일정하다"는 원칙입니다.
        이 법칙은 **조제프 프루스트**(Joseph Proust)에 의해 1799년에 제안되었습니다.
      </Text>

      <Text style={styles.text}>
        주요 내용:
        {"\n"}- 성분비의 일정성: 화합물이 형성될 때, 각 성분의 질량 비율은 항상 일정합니다. 예를 들어, 물(H₂O)은 항상 두 개의 수소 원자와 하나의 산소 원자로 이루어져 있으며, 이 비율은 변하지 않습니다.
        {"\n"}- 화합물의 성분비: 어떤 화합물이 형성될 때, 그 화합물의 성분이 결합하는 비율은 고정되어 있습니다. 이로 인해, 동일한 화합물은 언제나 동일한 성분비를 가집니다.
      </Text>
      
      <Text style={styles.text}>
        화학 반응 예시:
        {"\n"}- 이산화탄소 생성:
        {"\n"}  C + O₂ → CO₂
        {"\n"}  이 반응에서, 1g의 탄소와 2.67g의 산소가 결합하여 3.67g의 이산화탄소가 생성됩니다.
      </Text>
      
      <Text style={styles.text}>
        의의:
        {"\n"}- 화학 분석: 일정 성분비 법칙은 물질의 구성 성분을 분석하는 데 중요합니다. 예를 들어, 화합물의 구성 성분을 분석하여 화학식과 성분 비율을 결정할 수 있습니다.
        {"\n"}- 화학 합성: 일정한 성분비를 알면, 주어진 물질을 원하는 비율로 합성하는 데 필요한 원소나 화합물의 양을 계산할 수 있습니다.
      </Text>

      <Text style={styles.sectionTitle}>화학 반응에서의 예시 및 응용</Text>
      
      <Text style={styles.text}>
        연료의 연소 반응:
        {"\n"}- 메탄(Methane) 연소 반응:
        {"\n"}  CH₄ + 2O₂ → CO₂ + 2H₂O
        {"\n"}  이 반응에서, 메탄과 산소는 일정한 성분비로 결합하여 이산화탄소와 물을 생성합니다.
      </Text>

      <Text style={styles.text}>
        배합 비율 계산: 화학 실험이나 산업에서 일정 성분비 법칙을 활용하여 물질들을 정확한 비율로 결합할 수 있습니다.
      </Text>

      <Text style={styles.sectionTitle}>결론</Text>
      <Text style={styles.text}>
        - 질량 보존 법칙과 일정 성분비 법칙은 화학 반응의 예측과 이해에 필수적인 개념입니다.
        {"\n"}- 질량 보존 법칙은 화학 반응에서 물질의 질량 변화가 없다는 것을 의미하며, 일정 성분비 법칙은 화합물이 일정한 성분 비율로 형성된다는 원칙을 설명합니다.
        {"\n"}- 이러한 법칙들은 화학 반응을 예측하고 실험을 설계하며, 화학 산업에서 효율적인 생산과 안전을 보장하는 데 중요한 역할을 합니다.
      </Text>

      <Text style={styles.text}>
        이 두 가지 법칙은 화학 물질의 조합과 에너지 변환을 이해하는 데 필수적인 원리들로, 기초 화학뿐만 아니라 여러 화학 분야에서 그 중요성이 강조됩니다.
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: '#34495e',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2980b9',
    marginTop: 20,
  },
  text: {
    fontSize: 16,
    color: '#34495e',
    lineHeight: 24,
    marginTop: 10,
  },
});
