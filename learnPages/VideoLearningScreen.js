import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function VideoLearningScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>🎬 영상 학습 페이지입니다.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff7f5',
  },
  text: {
    fontSize: 20,
    color: '#c0392b',
    fontWeight: '600',
  },
});
