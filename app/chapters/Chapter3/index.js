// app/chapters/Chapter3/index.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Pressable,
  ImageBackground,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

export default function Chapter3Index() {
  const router = useRouter();

  const subtitles = [
    { id: '01', text: '운동', route: '/chapters/Chapter3/Chapter3_01' },
    { id: '02', text: '일과 에너지', route: '/chapters/Chapter3/Chapter3_02' },
  ];

  return (
    <ImageBackground
      source={require('../../../assets/images/chemistry2.png')} // Replace with your own energy-themed image
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity onPress={() => router.replace('/MenuScreen')} style={styles.backButton}>
          <Feather name="arrow-left" size={18} color="#2c3e50" />
          <Text style={styles.backText}> 뒤로가기</Text>
        </TouchableOpacity>

        <View style={styles.headerRow}>
          <FontAwesome5 name="bolt" size={24} color="#d35400" style={{ marginRight: 8 }} />
          <Text style={styles.chapterTitle}>Ⅲ. 운동과 에너지</Text>
        </View>
        <View style={styles.divider} />

        {subtitles.map(({ id, text, route }) => (
          <Pressable
            key={id}
            onPress={() => router.push(route)}
            style={({ pressed }) => [
              styles.item,
              pressed && styles.itemPressed,
            ]}
          >
            <View style={styles.bullet}>
              <Text style={styles.bulletText}>{id}</Text>
            </View>
            <Text style={styles.itemText}>{text}</Text>
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
  },
  container: {
    padding: 24,
    flexGrow: 1,
    backgroundColor: 'rgba(255,255,255,0.85)',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backText: {
    fontSize: 15,
    color: '#2c3e50',
    fontWeight: '500',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  chapterTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#d35400',
  },
  divider: {
    height: 2,
    backgroundColor: '#f8c471',
    marginBottom: 20,
    marginHorizontal: 40,
    borderRadius: 20,
  },
  item: {
    backgroundColor: '#fef5e7',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#fad7a0',
  },
  itemPressed: {
    backgroundColor: '#fdebd0',
  },
  bullet: {
    width: 36,
    height: 36,
    backgroundColor: '#f39c12',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  bulletText: {
    color: 'white',
    fontWeight: 'bold',
  },
  itemText: {
    fontSize: 16,
    color: '#2c3e50',
    fontWeight: '600',
    flexShrink: 1,
  },
});
