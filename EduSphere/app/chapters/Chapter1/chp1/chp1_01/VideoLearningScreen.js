import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
  TouchableOpacity,
  Alert
} from 'react-native';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { recordAttendanceOnComplete } from '../../../../service/attendanceService';

export default function VideoLearningScreen() {
  const videoId = 'W82aT47cnwM';

  const fetchDeadlineForChapter = async (chapter) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/deadlines/${chapter}`);
      return res.data.deadline?.deadline || null;
    } catch (e) {
      console.error('데드라인 조회 실패:', e);
      return null;
    }
  };

  const handleCompleteLearning = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const studentId = await AsyncStorage.getItem('mongoId');
      const chapter = 'Chapter1_01';
      const deadline = await fetchDeadlineForChapter(chapter);

      const result = await recordAttendanceOnComplete({
        studentId,
        chapter,
        deadline,
        token
      });

      if (result.success) {
        Alert.alert('완료', `학습 완료! 출결 상태: ${result.status}`);
        router.push('/chapters/Chapter1');
      } else {
        Alert.alert('오류', '출석 기록에 실패했습니다.');
      }
    } catch (err) {
      Alert.alert('오류', '예상치 못한 오류가 발생했습니다.');
    }
  };

  return (
    <View style={styles.container}>

      {/* 뒤로가기 버튼 */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.push('/chapters/Chapter1/Chapter1_02')}
      >
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

      {/* 학습 완료 버튼 */}
      <TouchableOpacity
        style={styles.completeButton}
        onPress={handleCompleteLearning}
      >
        <Text style={styles.completeButtonText}>학습 완료</Text>
      </TouchableOpacity>

      {/* 평가하기 버튼 */}
      <TouchableOpacity
        style={styles.evalButton}
        onPress={() =>
          router.push('/chapters/Chapter1/chp1/chp1_01/EvaluationScreen')
        }
      >
        <Text style={styles.evalButtonText}>평가하기</Text>
      </TouchableOpacity>

      {/* 이전으로 버튼 */}
      <TouchableOpacity
        style={styles.prevNavButton}
        onPress={() => router.push('/chapters/Chapter1/chp1/chp1_01/LearnScreen')}
      >
        <View style={styles.prevNavCircle}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </View>
        <Text style={styles.prevNavText}>이전으로</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: 'center',
    backgroundColor: '#fff7f5',
  },
  text: {
    fontSize: 20,
    color: '#c0392b',
    fontWeight: '600',
    marginBottom: 20,
  },
  videoContainer: {
    width: '90%',
    height: Dimensions.get('window').width * 0.5625,
    borderRadius: 10,
    overflow: 'hidden',
  },
  video: {
    flex: 1,
  },
  iframe: {
    borderWidth: 0,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#ecf0f1',
    borderRadius: 8,
  },
  backText: {
    marginLeft: 5,
    fontSize: 16,
    color: '#2c3e50',
  },
  prevNavButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 200,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 16,
    marginTop: 30,
    alignSelf: 'center',
  },
  prevNavCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
  },
  prevNavText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3498db',
  },
  // 학습 완료 버튼
  completeButton: {
    backgroundColor: '#4caf50',
    padding: 16,
    width: '90%',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 20,
  },
  completeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  // 평가하기 버튼
  evalButton: {
    backgroundColor: '#ffa000',
    padding: 16,
    width: '90%',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 12,
  },
  evalButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
