import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Pressable,
  ImageBackground,
  Animated,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

export default function Chapter1Index() {
  const router = useRouter();

  const subtitles = [
    { id: '01', text: '물질 변화와 화학 반응식', route: '/chapters/Chapter1/Chapter1_01' },
    { id: '02', text: '질량 보존 법칙, 일정 성분비 법칙', route: '/chapters/Chapter1/Chapter1_02' },
    { id: '03', text: '기체 반응 법칙, 화학 반응에서의 에너지 출입', route: '/chapters/Chapter1/Chapter1_03' },
    { id: '04', text: '(제목을 여기에 추가하세요)', route: '/chapters/Chapter1/Chapter1_04' },
  ];

  return (
    <ImageBackground
      source={require('../../../assets/images/chemistry.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity onPress={() => router.replace('/MenuScreen')} style={styles.backButton}>
          <Feather name="arrow-left" size={20} color="#ffffff" />
          <Text style={styles.backText}> 뒤로가기</Text>
        </TouchableOpacity>

        <View style={styles.headerRow}>
          <FontAwesome5 name="flask" size={30} color="#ffffff" style={styles.icon} />
          <Text style={styles.chapterTitle}>I. 화학 반응의 규칙과 에너지 변화</Text>
        </View>

        <View style={styles.divider} />

        {subtitles.map(({ id, text, route }) => (
          <Pressable
            key={id}
            onPress={() => router.push(route)}
            style={({ pressed }) => [
              styles.card,
              pressed && styles.cardPressed,
            ]}
          >
            <View style={styles.bullet}>
              <Text style={styles.bulletText}>{id}</Text>
            </View>
            <Text style={styles.cardText}>{text}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Add dark overlay to make text stand out more
  },
  container: {
    padding: 24,
    flexGrow: 1,
    backgroundColor: 'rgba(255,255,255,0.85)', // Light transparent background for readability
    borderRadius: 12,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    maxWidth: 120,
    elevation: 8, // Added elevation for better shadow effect
  },
  backText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '600',
    marginLeft: 8,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  chapterTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginLeft: 12,
  },
  icon: {
    marginRight: 12,
  },
  divider: {
    height: 3,
    backgroundColor: '#aed6f1',
    marginVertical: 20,
    marginHorizontal: 50,
    borderRadius: 25,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.85)', // Slightly lighter for better contrast
    padding: 20,
    borderRadius: 18,
    marginBottom: 18,
    borderColor: '#d0eafc',
    borderWidth: 1,
    shadowColor: '#2980b9',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 8,
    transition: 'background-color 0.3s', // Smooth background color change
  },
  cardPressed: {
    backgroundColor: '#eaf2f8',
  },
  bullet: {
    width: 45,
    height: 45,
    backgroundColor: '#2980b9',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 24,
  },
  bulletText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  cardText: {
    fontSize: 20,
    color: '#2c3e50',
    fontWeight: '600',
    flexShrink: 1,
  },
});
