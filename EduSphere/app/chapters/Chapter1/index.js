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

export default function Chapter1Index() {
  const router = useRouter();
  const { t } = useTranslation();

  const subtitles = [
    { id: '01', route: '/chapters/Chapter1/Chapter1_01' },
    { id: '02', route: '/chapters/Chapter1/Chapter1_02' },
    { id: '03', route: '/chapters/Chapter1/Chapter1_03' },
  ];

  return (
    <ImageBackground
      source={require('../../../assets/images/chemistry.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity onPress={() => router.replace('/HomeScreen')} style={styles.backButton}>
          <Feather name="arrow-left" size={20} color="#ffffff" />
          <Text style={styles.backText}> Home</Text>
        </TouchableOpacity>

        <View style={styles.headerRow}>
          <FontAwesome5 name="flask" size={30} color="#ffffff" style={styles.icon} />
          <Text style={styles.chapterTitle}>{t('chapter1.title')}</Text>
        </View>

        <View style={styles.divider} />

        {subtitles.map(({ id, route }) => (
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
            <Text style={styles.cardText}>{t(`chapter1.subtitles.${id}`)}</Text>
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
    borderRadius: 12,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 10,
    backgroundColor: 'rgba(30,58,138,0.85)',
    borderRadius: 30,
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2980b9',
    textAlign: 'center',
    marginLeft: 12,
    flex: 1,
    flexWrap: 'wrap',
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
    backgroundColor: 'rgba(255,255,255,0.85)',
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
