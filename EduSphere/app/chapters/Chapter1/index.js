import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  ImageBackground,
} from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

import styles from '../../../style/sharedIndexStyles';
import BackButton from '../../../components/BackButton'; // ✅ 재사용 가능한 뒤로가기 버튼 컴포넌트

export default function Chapter1Index() {
  const router = useRouter();
  const { t } = useTranslation(); // 다국어 번역 훅

  // 챕터1의 소주제 리스트
  const subtitles = [
    { id: '01', route: '/chapters/Chapter1/Chapter1_01' },
    { id: '02', route: '/chapters/Chapter1/Chapter1_02' },
    { id: '03', route: '/chapters/Chapter1/Chapter1_03' },
  ];

  return (
    <ImageBackground
      source={require('../../../assets/images/chemistry.png')} // 배경 이미지 설정
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.container}>
        {/* ✅ 홈으로 돌아가는 재사용 가능한 뒤로가기 버튼 */}
        <BackButton onPress={() => router.replace('/HomeScreen')} label="Home" />

        {/* 🧪 챕터 제목 섹션 */}
        <View style={styles.headerRow}>
          <FontAwesome5 name="flask" size={30} color="#ffffff" style={styles.icon} />
          <Text style={styles.chapterTitle}>{t('chapter1.title')}</Text>
        </View>

        {/* 구분선 */}
        <View style={styles.divider} />

        {/* ✅ 각 소주제(서브챕터) 카드 렌더링 */}
        {subtitles.map(({ id, route }) => (
          <Pressable
            key={id}
            onPress={() => router.push(route)} // 선택 시 해당 챕터로 이동
            style={({ pressed }) => [
              styles.card,
              pressed && styles.cardPressed, // 눌렀을 때 스타일 변경
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
