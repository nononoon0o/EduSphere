import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BackButton from '../../../../../components/BackButton'; // Adjust the path if needed
import styles from '../../../../../style/ChapterStyle/Chapter2/ch2Styles/HumanImpactClimateStyles'; // Adjust the path as necessary

const HumanImpactClimateScreen = () => {
  return (
    <View style={styles.container}>
      {/* Back Button */}
      <BackButton />

      <Text style={styles.title}>5. 인간의 영향</Text>
      <Text style={styles.text}>
        화석 연료 연소{"\n"}
        산림 벌채{"\n"}
        농업 및 가축
      </Text>
    </View>
  );
};


export default HumanImpactClimateScreen;
