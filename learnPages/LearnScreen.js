import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function LearnScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>📦 학습하기 페이지입니다.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fefaf1',
  },
  text: {
    fontSize: 20,
    color: '#8e44ad',
    fontWeight: '600',
  },
});
