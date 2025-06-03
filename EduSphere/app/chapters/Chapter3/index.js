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
import BackButton from '../../../components/BackButton'; // ✅ Import du composant


export default function Chapter3Index() {
  const router = useRouter();
  const { t } = useTranslation();

  const subtitles = [
    { id: '01', route: '/chapters/Chapter3/Chapter3_01' },
    { id: '02', route: '/chapters/Chapter3/Chapter3_02' },
  ];

  return (
    <ImageBackground
      source={require('../../../assets/images/chemistry2.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.container}>
        {/* ✅ Use reusable BackButton */}
        <BackButton onPress={() => router.replace('/HomeScreen')} label="Home" />

        <View style={styles.headerRow}>
          <FontAwesome5 name="bolt" size={24} color="#ffffff" style={{ marginRight: 8 }} />
          <Text style={styles.chapterTitle}>{t('chapter3.title')}</Text>
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
            <Text style={styles.itemText}>{t(`chapter3.subtitles.${id}`)}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </ImageBackground>
  );
}
