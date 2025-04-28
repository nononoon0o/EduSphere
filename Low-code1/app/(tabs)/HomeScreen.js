import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

export default function HomeScreen() {
  const router = useRouter();
  const [language, setLanguage] = useState('EN');

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

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'EN' ? 'KR' : 'EN'));
  };

  const chapters = [
    { id: 'Chapter1/Chapter1_main', title: 'Ⅰ. CHAPTER I', icon: 'flask', bgColor: '#8e44ad' },
    { id: 'Chapter2', title: 'Ⅱ. CHAPTER II', icon: 'cloud-sun', bgColor: '#3498db' },
    { id: 'Chapter3', title: 'Ⅲ. CHAPTER III', icon: 'bolt', bgColor: '#e67e22' },
    { id: 'Chapter4', title: 'Ⅳ. CHAPTER IV', icon: 'brain', bgColor: '#2ecc71' },
  ];

  return (
    <ImageBackground
      source={require('../../assets/images/mountain.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <View style={styles.logoSection}>
            <Image
              source={require('../../assets/images/logochimie.jpeg')}
              style={styles.logo}
            />
            <Text style={styles.brandName}>ChemXplore</Text>
          </View>
          <View style={styles.iconGroup}>
            <TouchableOpacity onPress={toggleLanguage} style={styles.languageButton}>
              <Text style={styles.languageText}>{language}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/SearchScreen')} style={styles.iconButton}>
              <Feather name="search" size={22} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/ProfileScreen')} style={styles.iconButton}>
              <Feather name="user" size={22} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Title & Description */}
        <Animated.View style={[styles.centerTextContainer, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <Text style={styles.mainTitle}>Discover the World of Chemistry</Text>
          <Text style={styles.subText}>
            Dive into atoms, reactions, and molecular mysteries. Learn the science behind everything.
          </Text>
          <TouchableOpacity
            style={styles.ctaButton}
            onPress={() => router.push('/ProfileScreen')}
          >
            <Text style={styles.ctaText}>Go to your account</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Chapter Title */}
        <View style={{ marginTop: 40, marginBottom: 12 }}>
          <Text style={styles.chapterSectionTitle}>중학교 3학년 1학기 과학 목차</Text>
        </View>

        {/* Chapters */}
        <View style={styles.chapterRow}>
          {chapters.map((chapter, index) => (
            <Animated.View
              key={chapter.id}
              style={{
                transform: [{ scale: fadeAnim }],
                width: '48%',
              }}
            >
              <TouchableOpacity
                style={[styles.chapterCard, { backgroundColor: chapter.bgColor }]}
                onPress={() => router.push(`/chapters/${chapter.id}`)}
              >
                <FontAwesome5 name={chapter.icon} size={24} color="#fff" style={{ marginBottom: 8 }} />
                <Text style={styles.chapterTitle}>{chapter.title}</Text>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 30,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  logoSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandName: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    marginLeft: 10,
    letterSpacing: 0.5,
  },
  logo: {
    width: 42,
    height: 42,
    borderRadius: 21,
  },
  iconGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 10,
  },
  languageText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  iconButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 10,
    borderRadius: 25,
    marginLeft: 8,
  },
  centerTextContainer: {
    alignItems: 'center',
    marginTop: 40,
    paddingHorizontal: 20,
  },
  mainTitle: {
    color: '#fff',
    fontSize: 34,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 12,
  },
  subText: {
    color: '#e0e0e0',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  ctaButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 30,
  },
  ctaText: {
    color: '#000',
    fontWeight: '700',
    fontSize: 16,
  },
  chapterSectionTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  chapterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    flexWrap: 'wrap',
    rowGap: 16,
  },
  chapterCard: {
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  chapterTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
