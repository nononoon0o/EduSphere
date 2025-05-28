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
import styles from '../../../style/sharedIndexStyles';

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
