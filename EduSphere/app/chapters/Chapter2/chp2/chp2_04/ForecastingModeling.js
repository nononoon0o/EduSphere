import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BackButton from '../../../../../components/BackButton'; // Adjust the path if needed
import styles from '../../../../../style/ChapterStyle/Chapter2/ch2Styles/ForecastingModelingStyles'; // Adjust the path as necessary

const ForecastingModelingScreen = () => {
  return (
    <View style={styles.container}>
      {/* Back Button */}
      <BackButton />

      <Text style={styles.title}>2. 날씨 변화의 예측과 모델링</Text>
      <Text style={styles.text}>
        기상학자들은 날씨 변화를 예측하기 위해...{"\n\n"}
        수치 예보 모델 (NWP):{"\n"}
        - 대기와 해양의 상태를 수학적으로 모델링{"\n\n"}
        상 위성 (Weather Satellites):{"\n"}
        - 지구의 대기와 표면을 관측
      </Text>
    </View>
  );
};

export default ForecastingModelingScreen;
