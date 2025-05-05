import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styles from '../../../../../style/ChapterStyle/Chapter1/ch1Style/CatalystScreenStyles';

const CatalystScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>6. 촉매와 활성화 에너지</Text>
      <Text style={styles.text}>
        촉매는 반응의 활성화 에너지를 낮추어 주는 물질입니다.
        촉매는 반응 경로를 변경시켜서 더 적은 에너지로 반응이 진행되도록 만듭니다.
        이는 화학 공정에서 매우 중요한 역할을 하며, 반응의 효율성을 높이고,
        특정 온도에서 반응을 빠르게 일으킬 수 있게 합니다.
      </Text>
    </View>
  );
};


export default CatalystScreen;
