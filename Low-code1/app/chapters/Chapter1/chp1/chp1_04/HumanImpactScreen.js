import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HumanImpactScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>4. 인간의 역할</Text>
      <Text style={styles.text}>
        인간의 활동은 기후 변화에 중대한 영향을 미칩니다.
        산업, 교통, 농업, 산림 벌채 등에서 발생하는 온실가스 배출은 지구의 온도를 상승시키고 있습니다.
        CO2 배출 감소, 청정 기술 도입, 재조림 등은 기후 변화의 영향을 완화하기 위한 중요한 조치입니다.

        날씨와 기후의 변화를 이해하는 것은 미래의 기상 조건에 더 잘 대비하고
              지구를 보호하기 위한 조치를 취하는 데 도움이 됩니다.
              과학은 계속 발전하고 있으며, 우리의 행동이 기후에 미치는 영향을 이해하는 것이 점점 더 중요해지고 있습니다.
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

export default HumanImpactScreen;
