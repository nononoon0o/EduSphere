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
import styles from '../../../style/ChapterStyle/Chapter4/indexStyles'; // Adjust the path as necessary

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