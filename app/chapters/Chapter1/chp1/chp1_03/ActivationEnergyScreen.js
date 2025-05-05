import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styles from '../../../../../style/ChapterStyle/Chapter1/ch1Style/ActivationEnergyScreenStyles';

const ActivationEnergyScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>3. 활성화 에너지와 반응 경로</Text>
      <Text style={styles.text}>
        반응이 진행되기 위해서는 활성화 에너지가 필요합니다.
        이는 반응물의 결합을 끊고 새로운 결합을 형성하기 위해 필요한 에너지로,
        이 에너지가 충분히 공급되면 반응이 일어날 수 있습니다.
        활성화 에너지의 개념은 화학 반응이 어떻게 진행되고 왜 특정 반응이 빨리 일어나는지 이해하는 데 중요합니다.
      </Text>
    </View>
  );
};

export default ActivationEnergyScreen;
