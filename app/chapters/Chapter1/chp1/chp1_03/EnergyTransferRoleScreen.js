import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styles from '../../../../../style/ChapterStyle/Chapter1/ch1Style/EnergyTransferRoleScreenStyles';

const EnergyTransferRoleScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>5. 에너지 전달의 화학 반응에서의 역할</Text>
      <Text style={styles.text}>
        화학 반응에서의 에너지 출입은 주로 발열 반응과 흡열 반응으로 나눌 수 있습니다.
        발열 반응은 주변 환경에 에너지를 방출하고, 흡열 반응은 반응을 지속시키기 위해 에너지를 흡수합니다.
        이러한 에너지의 전달은 여러 가지 화학적 및 산업적 과정에서 중요한 역할을 합니다.
        예를 들어, 화석 연료의 연소와 같은 발열 반응은 많은 에너지를 발생시킵니다.
      </Text>
    </View>
  );
};

export default EnergyTransferRoleScreen;
