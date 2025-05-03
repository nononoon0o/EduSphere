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

export default function Chapter4Index() {
  const router = useRouter();
  const { t } = useTranslation();

  const subtitles = [
    { id: '01', route: '/chapters/Chapter4/Chapter4_01' },
    { id: '02', route: '/chapters/Chapter4/Chapter4_02' },
  ];

  return (
    <ImageBackground
      source={require('../../../assets/images/chemistry3.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity
          onPress={() => router.replace('/HomeScreen')}
          style={[styles.backButton, styles.backButtonStyled]}
          activeOpacity={0.8}
        >
          <Feather name="arrow-left" size={18} color="#fff" />
          <Text style={styles.backTextStyled}> Home</Text>
        </TouchableOpacity>

        <View style={styles.headerRow}>
          <FontAwesome5 name="brain" size={24} color="#7d3c98" style={{ marginRight: 8 }} />
          <Text style={styles.chapterTitle}>{t('chapter4.title')}</Text>
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
            <Text style={styles.itemText}>{t(`chapter4.subtitles.${id}`)}</Text>
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
    backgroundColor: 'rgba(255,255,255,0.88)',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backTextStyled: {
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
    backgroundColor: '#d7bde2',
    marginBottom: 20,
    marginHorizontal: 40,
    borderRadius: 10,
  },
  item: {
    backgroundColor: '#f5eef8',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#d2b4de',
  },
  itemPressed: {
    backgroundColor: '#ebdef0',
  },
  bullet: {
    width: 36,
    height: 36,
    backgroundColor: '#af7ac5',
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
    color: '#4a235a',
    fontWeight: '600',
    flexShrink: 1,
  },
});
