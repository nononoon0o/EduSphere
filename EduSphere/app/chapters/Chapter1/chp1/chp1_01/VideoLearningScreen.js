import { View, Text, Dimensions, Platform, TouchableOpacity, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons'; // 아이콘 사용
import { router } from 'expo-router'; // 뒤로가기 기능
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { recordAttendanceOnComplete } from '../../../../service/attendanceService';
import styles from '../../../../../style/ChapterStyle/Chapter1/ch1Style/VideoLearningStyle';

export default function VideoLearningScreen() {
  const videoId = 'W82aT47cnwM'; // 원하는 유튜브 영상 ID

  const fetchDeadlineForChapter = async (chapter) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/deadlines/${chapter}`);
      return res.data.deadline?.deadline || null;
    } catch (e) {
      console.error('데드라인 조회 실패:', e);
      return null;
    }
  };

  //학습 완료 DB 저장 함수
  const handleCompleteLearning = async () => {
    try {
      // 필요한 정보 준비
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
      
      {/* 뒤로가기 버튼 */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={20} color="#2c3e50" />
        <Text style={styles.backText}>뒤로가기</Text>
      </TouchableOpacity>

      <Text style={styles.text}>🎬 영상 학습 페이지입니다.</Text>

      <TouchableOpacity
        style={{
          backgroundColor: '#4caf50',
          padding: 16,
          margin: 16,
          borderRadius: 8,
          alignItems: 'center'
        }}
        onPress={handleCompleteLearning}
      >
        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>학습 완료</Text>
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
    </View>
  );
}