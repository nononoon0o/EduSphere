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
