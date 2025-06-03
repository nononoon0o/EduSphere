import React from 'react';
import { View, Text, StyleSheet, Dimensions, Platform, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons'; // 아이콘 불러오기
import { router } from 'expo-router'; // router.back()을 위해 필요
import styles from '../../../../../style/ChapterStyle/Chapter1/ch1Style/VideoLearningStyle';
import BackButton from '../../../../../components/BackButton';


export default function VideoLearningScreen() {
  const videoId = 'V7Z9e0DXamI'; // 원하는 유튜브 영상 ID

  return (
    <View style={styles.container}>
      
      {/* 뒤로가기 버튼 */}
      {/* ✅ Shared 뒤로가기 버튼 */}
                  <BackButton onPress={() => router.replace('/chapters/Chapter1/Chapter1_03')} />

      <Text style={styles.text}>🎬 영상 학습 페이지입니다.</Text>

      {Platform.OS === 'web' ? (
        <iframe
          width="90%"
          height={Dimensions.get('window').width * 0.5625}
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={styles.iframe}
        />
      ) : (
        <View style={styles.videoContainer}>
          <WebView
            source={{ uri: `https://www.youtube.com/embed/${videoId}` }}
            style={styles.video}
            allowsFullscreenVideo
          />
        </View>
      )}
      <TouchableOpacity
        style={styles.prevNavButton}
        onPress={() => router.push('/chapters/Chapter1/chp1/chp1_03/LearnScreen')}
      >
        <View style={styles.prevNavCircle}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </View>
        <Text style={styles.prevNavText}>이전으로</Text>
      </TouchableOpacity>
</View>
  );
}
