import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Chapter1_04() {
  const router = useRouter();

  return (
    <ImageBackground
      source={{ uri: 'https://example.com/your-background-image.jpg' }} // Replace with your actual background image
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.overlay}>
        {/* Back button */}
              <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <Ionicons name="chevron-back" size={22} color="#fff" />
                <Text style={styles.backText}>돌아가기</Text>
              </TouchableOpacity>

        {/* Header Box */}
        <View style={styles.headerBox}>
          <Text style={styles.headerTitle}>04 (날씨의 변화)</Text>
          <Text style={styles.headerDescription}>
            날씨의 변화와 기후 변화는 여러 요인에 의해 발생하며, 이는 대기, 지리적 요소 및 인간 활동에 의해 영향을 받습니다. 
            이 단원에서는 기후와 날씨의 역학을 자세히 살펴보겠습니다.
          </Text>
        </View>

        {/* Menu Buttons */}
        {[
            { title: '1. 기후 및 날씨의 주요 요인', path: '/chapters/Chapter1/chp1/chp1_04/WeatherFactorsScreen' },
            { title: '2. 기후 변화', path: '/chapters/Chapter1/chp1/chp1_04/ClimateChangeScreen' },
            { title: '3. 기상 예측과 기후 모델', path: '/chapters/Chapter1/chp1/chp1_04/ForecastingScreen' },
            { title: '4. 인간의 역할', path: '/chapters/Chapter1/chp1/chp1_04/HumanImpactScreen' },
          ].map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.card}
              onPress={() => router.push(item.path)}
            >
              <Text style={styles.cardText}>{item.title}</Text>
            </TouchableOpacity>
          ))}

      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // light green overlay
    flexGrow: 1,
    padding: 20,
    paddingBottom: 40,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e3a8a',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 30,
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  backText: {
    fontSize: 16,
    marginLeft: 6,
    color: '#fff',
    fontWeight: '600',
  },
  headerBox: {
    backgroundColor: '#f0f5e1',
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2e2e2e',
    marginBottom: 6,
  },
  headerDescription: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  card: {
    backgroundColor: '#d9e6c3',
    borderRadius: 10,
    paddingVertical: 18,
    paddingHorizontal: 14,
    marginBottom: 12,
  },
  cardText: {
    fontSize: 15,
    color: '#1f1f1f',
    fontWeight: '500',
  },
});
