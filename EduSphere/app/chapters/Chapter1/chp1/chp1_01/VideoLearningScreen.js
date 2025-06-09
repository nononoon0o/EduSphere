import React from 'react';
import {
  View,
  Text,
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
import { recordAttendanceOnComplete } from '../../../../../services/attendanceService';
import styles from '../../../../../style/ChapterStyle/Chapter1/ch1Style/VideoLearningStyle';
import BackButton from '../../../../../components/BackButton';
import { useTranslation } from 'react-i18next';
import PreviousButton from '../../../../../components/PreviousButton';


export default function VideoLearningScreen() {
  const { t } = useTranslation();
  const videoId = 'W82aT47cnwM';

  const fetchDeadlineForChapter = async (chapter) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/deadlines/${chapter}`);
      return res.data.deadline?.deadline || null;
    } catch (e) {
      console.error('Failed to fetch deadline:', e);
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
        Alert.alert(
          t('videoLearning.complete'),
          t('videoLearning.completeMessage', { status: result.status })
        );
        router.push('chapters/Chapter1');
      } else {
        Alert.alert(t('videoLearning.error'), t('videoLearning.attendanceFail'));
      }
    } catch (err) {
      Alert.alert(t('videoLearning.error'), t('videoLearning.unexpectedError'));
    }
  };

  return (
    <View style={styles.container}>
      <BackButton onPress={() => router.replace('/chapters/Chapter1/Chapter1_01')} />

      <Text style={styles.text}>{t('videoLearning.title')}</Text>

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

      {/* ✅ Evaluation Button */}
      <TouchableOpacity
        style={{
          backgroundColor: '#f57c00',
          padding: 16,
          marginHorizontal: 16,
          marginBottom: 16,
          borderRadius: 8,
          alignItems: 'center',
          width: '90%',
        }}
        onPress={() => router.push('/chapters/Chapter1/chp1/chp1_01/EvaluationScreen')}
      >
        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
          {t('videoLearning.evaluate')}
        </Text>
      </TouchableOpacity>

      {/* ✅ Only Previous Button */}
      <View style={{ alignItems: 'flex-start', width: '90%', alignSelf: 'center' }}>
        <PreviousButton onPress={() => router.push('/chapters/Chapter1/chp1/chp1_01/LearnScreen')} />
      </View>
    </View>
  );
}
