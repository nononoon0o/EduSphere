import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BackButton from '../../../../../components/BackButton'; // Adjust the path if needed
import styles from '../../../../../style/ChapterStyle/Chapter2/ch2Styles/EnergyTransferMechanismsStyles'; // Adjust the path as necessary

const EnergyTransferMechanismsScreen = () => {
  return (
    <View style={styles.container}>
      {/* Back Button */}
      <BackButton />

      <Text style={styles.title}>4. 에너지 전송 메커니즘</Text>
      <Text style={styles.text}>
        전도{"\n"}
        대류{"\n"}
        복사
      </Text>
    </View>
  );
};


export default EnergyTransferMechanismsScreen;
