import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const WeatherFactorsScreen = () => {
  const router = useRouter();
  
  const sections = [
    { title: 'a. 온도', route: '/chapters/Chapter1/chp1/chp1_04/ch1_04_01/TemperatureDetail' },
    { title: 'b. 대기압', route: '/chapters/Chapter1/chp1/chp1_04/ch1_04_01/PressureDetailScreen' },
    { title: 'c. 습도 및 강수량', route: '/chapters/Chapter1/chp1/chp1_04/ch1_04_01/HumidityDetailScreen' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>1. 기후 및 날씨의 주요 요인</Text>
      
      {sections.map((section, index) => (
        <TouchableOpacity
          key={index}
          style={styles.sectionButton}
          onPress={() => router.push(section.route)}
        >
          <Text style={styles.sectionTitle}>{section.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7EF9F9',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#D9F2F2',
    padding: 10,
    borderRadius: 5,
    marginBottom: 30,
    textAlign: 'center',
  },
  sectionButton: {
    backgroundColor: '#A0B5B9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#000',
  },
});

export default WeatherFactorsScreen;
