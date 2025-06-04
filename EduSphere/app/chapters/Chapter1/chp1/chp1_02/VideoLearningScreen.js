import React from 'react';
import { View, Text, Dimensions, Platform, TouchableOpacity, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { recordAttendanceOnComplete } from '../../../../../services/attendanceService';
import styles from '../../../../../style/ChapterStyle/Chapter1/ch1Style/VideoLearningStyle';
import BackButton from '../../../../../components/BackButton';

export default function VideoLearningScreen() {
  const videoId = 'mUapW54ODMc';

  const handleCompleteLearning = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const studentId = await AsyncStorage.getItem('mongoId');
      const chapter = 'Chapter1_02';

      const res = await axios.get(`http://localhost:5000/api/deadlines/${chapter}`);
      const deadline = res.data.deadline?.deadline || null;

      const result = await recordAttendanceOnComplete({
        studentId,
        chapter,
        deadline,
        token
      });

      if (result.success) {
        Alert.alert('완료', `학습 완료! 출결 상태: ${result.status}`);
        router.push('chapters/Chapter1');
      } else {
        Alert.alert('오류', '출석 기록에 실패했습니다.');
      }
    } catch (err) {
      Alert.alert('오류', '예상치 못한 오류가 발생했습니다.');
    }
  };

  return (
    <View style={styles.container}>
      <BackButton onPress={() => router.replace('/chapters/Chapter1/Chapter1_02')} />

      <Text style={styles.text}>🎬 영상 학습 페이지입니다.</Text>

      <TouchableOpacity style={styles.completeButton} onPress={handleCompleteLearning}>
        <Text style={styles.completeButtonText}>학습 완료</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.evaluationButton}
        onPress={() => router.push('/chapters/Chapter1/chp1/chp1_02/EvaluationScreen')}
      >
        <Text style={styles.evaluationText}>평가하기</Text>
      </TouchableOpacity>

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
