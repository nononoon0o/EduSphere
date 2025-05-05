import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BackButton from '../../../../../components/BackButton'; // Adjust the path if needed
import styles from '../../../../../style/ChapterStyle/Chapter2/ch2Styles/WindDetailStyles'; // Adjust the path as necessary

const WindDetailScreen = () => {
  return (
    <View style={styles.container}>
      {/* Back Button */}
      <BackButton />

      <Text style={styles.title}>2. 바람 (Wind)</Text>
      <Text style={styles.text}>
        바람은 대기 중의 기체가 고온에서 저온으로 이동하는 현상입니다...{"\n\n"}
        기압과 바람의 관계:{"\n"}
        - 바람은 기체의 압력 차이에 따라 발생합니다.
      </Text>
    </View>
  );
};

export default WindDetailScreen;
