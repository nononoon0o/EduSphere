import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styles from '../../../../../style/ChapterStyle/Chapter1/ch1Style/PracticalApplicationScreenStyles';

const PracticalApplicationScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>7. 기체 법칙과 에너지 전달의 실용적 적용</Text>
      <Text style={styles.text}>
        기체 법칙과 에너지 전달 원리는 다양한 산업 분야에서 매우 중요한 역할을 합니다.
        화학 공정에서 기체 반응을 최적화하고, 환경 과학에서 온실가스와 그들의 영향을 모델링하는 데 필요합니다.
        또한, 에너지 저장 및 지속 가능한 기술 개발에 중요한 기초 지식을 제공합니다.
      </Text>
    </View>
  );
};

export default PracticalApplicationScreen;
