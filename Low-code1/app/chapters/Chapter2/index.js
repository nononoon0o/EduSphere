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
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

export default function Chapter2Index() {
  const router = useRouter();
  const { t } = useTranslation();

  const subtitles = [
    { id: '01', route: '/chapters/Chapter2/Chapter2_01' },
    { id: '02', route: '/chapters/Chapter2/Chapter2_02' },
    { id: '03', route: '/chapters/Chapter2/Chapter2_03' },
    { id: '04', route: '/chapters/Chapter2/Chapter2_04' },
  ];

  return (
    <ImageBackground
      source={require('../../../assets/images/chemistry1.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity
          onPress={() => router.replace('/HomeScreen')}
          style={styles.backButton}
          activeOpacity={0.8}
        >
          <Feather name="chevron-left" size={18} color="#ffffff" />
          <Text style={styles.backText}> Home</Text>
        </TouchableOpacity>

        <View style={styles.headerRow}>
          <FontAwesome5 name="cloud-sun" size={24} color="#ffffff" style={{ marginRight: 8 }} />
          <Text style={styles.chapterTitle}>{t('chapter2.title')}</Text>
        </View>

        <View style={styles.divider} />

        {subtitles.map(({ id, route }) => (
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
            <Text style={styles.itemText}>{t(`chapter2.subtitles.${id}`)}</Text>
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
    backgroundColor: '#1e3a8a',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 30,
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  backText: {
    fontSize: 15,
    color: '#ffffff',
    fontWeight: '600',
    marginLeft: 6,
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
    color: '#2980b9',
  },
  divider: {
    height: 2,
    backgroundColor: '#aed6f1',
    marginBottom: 20,
    marginHorizontal: 40,
    borderRadius: 20,
  },
  item: {
    backgroundColor: '#f2f6fc',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#d6eaf8',
  },
  itemPressed: {
    backgroundColor: '#d4e6f1',
  },
  bullet: {
    width: 36,
    height: 36,
    backgroundColor: '#5dade2',
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
