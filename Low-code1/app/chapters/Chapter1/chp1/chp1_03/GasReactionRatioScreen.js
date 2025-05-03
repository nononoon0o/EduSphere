import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const GasReactionRatioScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>1. 기체 반응에서의 부피 비율</Text>
      <Text style={styles.text}>
        기체 반응에 대한 법칙은 기체가 일정한 온도와 압력에서 반응할 때,
        그 부피 비율이 간단한 정수 비율로 나타나는 것을 설명합니다. 이는 조제프 게이뤼삭의 기체 결합 법칙에 의해 제시된 것으로,
        예를 들어 수소와 산소가 반응하여 물을 만들 때 두 개의 수소 분자가 한 개의 산소 분자와 결합해 물 두 분자가 형성되는 관계를 보여줍니다.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontWeight: 'bold', fontSize: 18, marginBottom: 10 },
  text: { fontSize: 16 }
});

export default GasReactionRatioScreen;
