import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function LearnScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>📦 학습하기 페이지입니다.</Text>

      <View style={styles.buttonContainer}>
        <View style={styles.buttonBlue}>
          <Text style={styles.buttonText}>🔹 물리 변화</Text>
        </View>

        <View style={styles.buttonOrange}>
          <Text style={styles.buttonText}>🔸 화학 변화</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fefaf1',
    padding: 20,
  },
  text: {
    fontSize: 20,
    color: '#8e44ad',
    fontWeight: '600',
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  buttonBlue: {
    flex: 1,
    backgroundColor: '#3498db',
    padding: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  buttonOrange: {
    flex: 1,
    backgroundColor: '#e67e22',
    padding: 12,
    borderRadius: 6,
    marginLeft: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});
