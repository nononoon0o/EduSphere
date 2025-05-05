import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BackButton from '../../../../../components/BackButton'; // Adjust the path if needed
import styles from '../../../../../style/ChapterStyle/Chapter2/ch2Styles/ScientificPrinciplesStyles'; // Adjust the path as necessary

const ScientificPrinciplesScreen = () => {
  return (
    <View style={styles.container}>
      {/* Back Button */}
      <BackButton />

      <Text style={styles.title}>1. 날씨 변화의 과학적 원리</Text>
      <Text style={styles.text}>
        날씨는 주로 대기층 내의 물리적, 화학적 상호작용에 의해 결정됩니다.{"\n\n"}
        기온 (Temperature): 대기의 온도를 측정한 값{"\n"}
        기압 (Pressure): 대기의 무게에 의한 압력{"\n"}
        습도 (Humidity): 대기 중 존재하는 수증기의 양{"\n"}
        바람 (Wind): 대기 중에서 공기의 흐름
      </Text>
    </View>
  );
};

export default ScientificPrinciplesScreen;
