import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { useRouter } from 'expo-router';
import screenMap from '../routes/screenMap';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function MenuScreen() {
  const [visibleChapter, setVisibleChapter] = useState(null);
  const router = useRouter();

  const toggleChapter = (chapterId, title) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const route = screenMap[title];
    if (route) {
      router.push(route);
    } else {
      console.warn(`⚠️ No overview route found for: "${title}"`);
    }
    setVisibleChapter((prev) => (prev === chapterId ? null : chapterId));
  };

  const handleItemPress = (item) => {
    const route = screenMap[item];
    if (route) {
      router.push(route);
    } else {
      console.warn(`⚠️ No route found for: "${item}"`);
    }
  };

  return (
    <LinearGradient
      colors={['#dbeafe', '#f1f7fc', '#ffffff']}
      style={styles.gradient}
    >
      <Text style={styles.emoji}>📘</Text>
      <Text style={styles.title}>중학교 3학년 1학기 과학 목차</Text>

      <ScrollView contentContainerStyle={styles.scroll}>
        {chapters.map((chapter) => (
          <View key={chapter.id} style={styles.section}>
            <TouchableOpacity
              style={styles.chapterButton}
              onPress={() => toggleChapter(chapter.id, chapter.title)}
            >
              <Text style={styles.sectionTitle}>
                <Feather
                  name={visibleChapter === chapter.id ? 'chevron-down' : 'chevron-right'}
                  size={18}
                  color="#fff"
                />{' '}
                {chapter.title}
              </Text>
            </TouchableOpacity>

            {visibleChapter === chapter.id &&
              chapter.items.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.itemButton}
                  onPress={() => handleItemPress(item)}
                >
                  <Text style={styles.item}>{item}</Text>
                </TouchableOpacity>
              ))}
          </View>
        ))}
      </ScrollView>
    </LinearGradient>
  );
}
const chapters = [
  {
    id: 'CH1',
    title: 'Ⅰ. CHAPTER I',
    items: [
      'Ⅰ. 화학 반응의 규칙과 에너지 변화',
      '01. 물질 변화와 화학 반응식',
      '02. 질량 보존 법칙, 일정 성분비 법칙',
      '03. 기체 반응 법칙, 화학 반응에서의 에너지 출입',
      '04. (제목을 여기에 추가하세요)',
    ],
  },
  {
    id: 'CH2',
    title: 'Ⅱ. CHAPTER II',
    items: [
      'Ⅱ. 기권과 날씨',
      '01. 기권과 지구 기온',
      '02. 구름과 강수',
      '03. 기압과 바람',
      '04. 날씨의 변화',
    ],
  },
  {
    id: 'CH3',
    title: 'Ⅲ. CHAPTER III',
    items: ['Ⅲ. 운동과 에너지', '01. 운동', '02. 일과 에너지'],
  },
  {
    id: 'CH4',
    title: 'Ⅳ. CHAPTER IV',
    items: ['Ⅳ. 자극과 반응', '01. 감각 기관', '02. 신경계와 호르몬'],
  },
];


const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  emoji: {
    fontSize: 48,
    textAlign: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1e3a8a',
    textAlign: 'center',
    marginBottom: 24,
    letterSpacing: 0.5,
  },
  scroll: {
    paddingBottom: 30,
  },
  section: {
    marginBottom: 24,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#ffffffcc', // semi-transparent card feel
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 3,
  },
  chapterButton: {
    backgroundColor: '#2563eb', // Tailwind blue-600
    paddingVertical: 16,
    paddingHorizontal: 18,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.3,
  },
  itemButton: {
    backgroundColor: '#f9fafb',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  item: {
    fontSize: 15.5,
    fontWeight: '500',
    color: '#1f2937',
  },
});
