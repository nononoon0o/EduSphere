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
import { useTranslation } from 'react-i18next';
import PreviousButton from '../../../../../components/PreviousButton';

export default function VideoLearningScreen() {
  const { t } = useTranslation();
  const videoId = 'V7Z9e0DXamI';

  const handleCompleteLearning = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const studentId = await AsyncStorage.getItem('mongoId');
      const chapter = 'Chapter1_03';

      const res = await axios.get(`http://localhost:5000/api/deadlines/${chapter}`);
      const deadline = res.data.deadline?.deadline || null;

      const result = await recordAttendanceOnComplete({
        studentId,
        chapter,
        deadline,
        token
      });

      if (result.success) {
        Alert.alert(
          t('chapter1_03.videoLearning.completed'),
          t('chapter1_03.videoLearning.completionSuccess', { status: result.status })
        );
        router.push('chapters/Chapter1');
      } else {
        Alert.alert(
          t('chapter1_03.videoLearning.back'),
          t('chapter1_03.videoLearning.completionError')
        );
      }
    } catch (err) {
      Alert.alert(
        t('chapter1_03.videoLearning.back'),
        t('chapter1_03.videoLearning.unexpectedError')
      );
    }
  };

  return (
    <View style={styles.container}>
      <BackButton onPress={() => router.replace('/chapters/Chapter1/Chapter1_03')} />

      <Text style={styles.text}>{t('chapter1_03.videoLearning.title')}</Text>

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

      {/* ✅ Evaluate Button */}
      <TouchableOpacity
        style={{
          backgroundColor: '#f57c00',
          padding: 16,
          marginHorizontal: 16,
          marginBottom: 16,
          borderRadius: 8,
          alignItems: 'center',
          width: '90%'
        }}
        onPress={() => router.push('/chapters/Chapter1/chp1/chp1_03/EvaluationScreen')}
      >
        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
          {t('chapter1_03.videoLearning.evaluate')}
        </Text>
      </TouchableOpacity>

      {/* ✅ Only Previous Button */}
      <View style={{ alignItems: 'flex-start', width: '90%', alignSelf: 'center' }}>
        <PreviousButton onPress={() => router.push('/chapters/Chapter1/chp1/chp1_03/LearnScreen')} />
      </View>
    </View>
  );
}
