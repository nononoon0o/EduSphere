import React from 'react';
import { View, Text, Dimensions, Platform, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import styles from '../../../../../style/ChapterStyle/Chapter1/ch1Style/VideoLearningStyle';

export default function VideoLearningScreen() {
  const videoId = 'mUapW54ODMc';

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.push('/chapters/Chapter1/Chapter1_02')}>
        <Ionicons name="arrow-back" size={20} color="#2c3e50" />
        <Text style={styles.backText}>뒤로가기</Text>
      </TouchableOpacity>

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
        onPress={() => router.push('/chapters/Chapter1/chp1/chp1_02/LearnScreen')}
      >
        <View style={styles.prevNavCircle}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </View>
        <Text style={styles.prevNavText}>이전으로</Text>
      </TouchableOpacity>
    </View>
  );
}
