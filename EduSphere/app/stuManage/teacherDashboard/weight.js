import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackButton from '../../../components/BackButton';
import styles from '../../../style/stuManageStyle/weightStyle';
import { useTranslation } from 'react-i18next';

export default function WeightScreen() {
  const { t } = useTranslation();
  const [school, setSchool] = useState('');
  const [classId, setClassId] = useState('');
  const [quiz, setQuiz] = useState('40');
  const [attendance, setAttendance] = useState('30');
  const [assignment, setAssignment] = useState('30');
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const handleSave = async () => {
    const quizNum = Number(quiz);
    const attendanceNum = Number(attendance);
    const assignmentNum = Number(assignment);

    if (
      isNaN(quizNum) || isNaN(attendanceNum) || isNaN(assignmentNum) ||
      quizNum < 0 || attendanceNum < 0 || assignmentNum < 0
    ) {
      Alert.alert('입력 오류', '모든 입력값은 0 이상의 숫자여야 합니다.');
      return;
    }

    if (quizNum + attendanceNum + assignmentNum !== 100) {
      Alert.alert('입력 오류', '비율의 합이 100이 되어야 합니다.');
      return;
    }

    setSaving(true);
    try {
      const token = await AsyncStorage.getItem('token');
      await axios.put(
        `http://localhost:5000/api/scores/weight/${school}/${classId}`,
        { quiz: quizNum, attendance: attendanceNum, assignment: assignmentNum },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Alert.alert('저장 완료', '점수 비율이 저장되었습니다!');
    } catch (e) {
      Alert.alert('저장 실패', '저장에 실패했습니다.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <View>
      <BackButton onPress={() => router.replace('/stuManage/teacherDashboard')} />
      <ScrollView style={styles.container}>
        <Text style={styles.sectionTitle}>{t('weight.title') || '점수 비율 설정'}</Text>
        
        <View style={styles.inputRow}>
          <Text style={styles.itemTitle}>학교</Text>
          <TextInput style={styles.input} value={school} onChangeText={setSchool} placeholder="학교명" />
        </View>
        <View style={styles.inputRow}>
          <Text style={styles.itemTitle}>반</Text>
          <TextInput style={styles.input} value={classId} onChangeText={setClassId} placeholder="반 (예: 1-2)" />
        </View>
        <View style={styles.inputRow}>
          <Text style={styles.itemTitle}>평가 (%)</Text>
          <TextInput style={styles.input} value={quiz} onChangeText={setQuiz} keyboardType="numeric" />
        </View>
        <View style={styles.inputRow}>
          <Text style={styles.itemTitle}>출결 (%)</Text>
          <TextInput style={styles.input} value={attendance} onChangeText={setAttendance} keyboardType="numeric" />
        </View>
        <View style={styles.inputRow}>
          <Text style={styles.itemTitle}>과제 (%)</Text>
          <TextInput style={styles.input} value={assignment} onChangeText={setAssignment} keyboardType="numeric" />
        </View>
        <TouchableOpacity
          style={styles.appButtonContainer}
          onPress={handleSave}
          disabled={saving}
        >
          <Text style={styles.appButtonText}>{saving ? '저장중...' : '저장'}</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
