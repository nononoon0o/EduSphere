import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ClimateChangeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>2. 기후 변화</Text>
      <Text style={styles.text}>
        기후 변화는 주로 인간 활동으로 인한 장기적인 기상 패턴의 변화를 의미합니다. 온실 효과는 자연적인 현상으로,
        특정 가스가 대기에서 열을 가두어 지구의 온도를 유지하게 합니다. 하지만 인간 활동으로 인해 이러한 온실가스의 농도가 증가하고 있습니다.
        변화의 영향:
        {"\n"}- 극단적인 기상 현상: 더 잦은 폭염, 폭풍, 홍수, 가뭄과 같은 극단적인 날씨를 유발합니다.
        {"\n"}- 해양의 변화 및 해수면 상승: 지구 온난화는 해양의 팽창과 얼음의 녹음을 초래하여 해수면 상승을 초래합니다.
        {"\n"}- 농업 피해: 기후 패턴의 변화는 농작물 생산성에 부정적인 영향을 미칠 수 있습니다.
        {"\n"}- 기후 난민: 극단적인 기상 현상은 사람들을 이주하게 만들 수 있으며, 이는 사회적 문제를 일으킬 수 있습니다.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 15,
  },
  text: {
    fontSize: 16,
    color: '#000',
  },
});

export default ClimateChangeScreen;
