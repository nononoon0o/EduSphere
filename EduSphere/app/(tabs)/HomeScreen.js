import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Animated,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import styles from '../../style/HomeStyle/HomeScreenStyles';

export default function HomeScreen() {
  const router = useRouter();
  const { t, i18n } = useTranslation();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const chapters = [
    { id: 'Chapter1', title: 'Ⅰ. CHAPTER I', icon: 'flask', bgColor: '#e74c3c' },
    { id: 'Chapter2', title: 'Ⅱ. CHAPTER II', icon: 'cloud-sun', bgColor: '#2980b9' },
    { id: 'Chapter3', title: 'Ⅲ. CHAPTER III', icon: 'bolt', bgColor: '#27ae60' },
    { id: 'Chapter4', title: 'Ⅳ. CHAPTER IV', icon: 'brain', bgColor: '#f39c12' },
  ];

  // Create press animations refs only once
  const pressAnims = useRef(chapters.map(() => new Animated.Value(1))).current;

  return (
    <ImageBackground
      source={require('../../assets/images/mountain.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.overlay}>
          <Animated.View
            style={[
              styles.centerTextContainer,
              { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
            ]}
          >
            <Text style={styles.mainTitle}>{t('title')}</Text>
            <Text style={styles.subText}>{t('subtitle')}</Text>
            <TouchableOpacity
              style={styles.ctaButton}
              onPress={() => router.push('/ProfileScreen')}
            >
              <Text style={styles.ctaText}>{t('goToAccount')}</Text>
            </TouchableOpacity>
          </Animated.View>

          <View style={{ marginTop: 40, marginBottom: 12 }}>
            <Text style={styles.chapterSectionTitle}>{t('chapterList')}</Text>
          </View>

          <View style={styles.chapterRow}>
            {chapters.map((chapter, index) => {
              const pressAnim = pressAnims[index];

              const onPressIn = () => {
                Animated.spring(pressAnim, {
                  toValue: 0.95,
                  useNativeDriver: true,
                }).start();
              };

              const onPressOut = () => {
                Animated.spring(pressAnim, {
                  toValue: 1,
                  friction: 3,
                  tension: 40,
                  useNativeDriver: true,
                }).start();
              };

              return (
                <Animated.View
                  key={chapter.id}
                  style={{
                    transform: [{ scale: fadeAnim }],
                    width: '48%',
                  }}
                >
                  <Animated.View style={{ transform: [{ scale: pressAnim }] }}>
                    <TouchableOpacity
                      activeOpacity={0.9}
                      style={[styles.chapterCard, { backgroundColor: chapter.bgColor }]}
                      onPressIn={onPressIn}
                      onPressOut={onPressOut}
                      onPress={() => router.push(`/chapters/${chapter.id}`)}
                    >
                      <FontAwesome5
                        name={chapter.icon}
                        size={24}
                        color="#fff"
                        style={{ marginBottom: 8 }}
                      />
                      <Text style={styles.chapterTitle}>
                        {t(`chapterTitles.${chapter.id}`)}
                      </Text>
                    </TouchableOpacity>
                  </Animated.View>
                </Animated.View>
              );
            })}
          </View>

          <View style={styles.footer}>


            <Text style={styles.legalText}>© 2025 Edusphere. {t('legal')}</Text>

            <View style={styles.languageSwitcher}>
              <TouchableOpacity onPress={() => i18n.changeLanguage('en')}>
                <Text style={styles.footerLinkText}>English</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => i18n.changeLanguage('fr')}>
                <Text style={styles.footerLinkText}>Français</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => i18n.changeLanguage('ko')}>
                <Text style={styles.footerLinkText}>한국어</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}