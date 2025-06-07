import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BackButton from '../../../../../components/BackButton'; // Adjust the path if needed
import styles from '../../../../../style/ChapterStyle/Chapter2/ch2Styles/ClimateChangeEffectsStyles'; // Adjust the path as necessary

const ClimateChangeEffectsScreen = () => {
  return (
    <View style={styles.container}>
      {/* Back Button */}
      <BackButton />

      <Text style={styles.title}>6. 기후 변화의 영향</Text>
      <Text style={styles.text}>
        지구 온도 상승{"\n"}
        빙하 융해 및 해수면 상승{"\n"}
        극단적 날씨
      </Text>
    </View>
  );
};

export default ClimateChangeEffectsScreen;
