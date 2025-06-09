import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
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
  const [errorMessage, setErrorMessage] = useState("");
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
      setErrorMessage(t('weight.error.invalidNumber'));
      return;
    }

    if (quizNum + attendanceNum + assignmentNum !== 100) {
      setErrorMessage(t('weight.error.sumNot100'));
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
      setErrorMessage(t('weight.success.message'));
    } catch (e) {
      setErrorMessage(t('weight.fail.message'));
    } finally {
      setSaving(false);
    }
  };

  return (
    <View>
      <BackButton onPress={() => router.replace('/stuManage/teacherDashboard')} />
      <ScrollView style={styles.container}>
        <Text style={styles.sectionTitle}>{t('weight.title')}</Text>

        {errorMessage !== "" && (
          <Text style={{ color: "red", marginBottom: 10, textAlign: 'center', fontWeight: "bold" }}>
            {errorMessage}
          </Text>
        )}

        <View style={styles.inputRow}>
          <Text style={styles.itemTitle}>{t('weight.school')}</Text>
          <TextInput
            style={styles.input}
            value={school}
            onChangeText={setSchool}
            placeholder={t('weight.school')}
          />
        </View>

        <View style={styles.inputRow}>
          <Text style={styles.itemTitle}>{t('weight.class')}</Text>
          <TextInput
            style={styles.input}
            value={classId}
            onChangeText={setClassId}
            placeholder={t('weight.classPlaceholder')}
          />
        </View>

        <View style={styles.inputRow}>
          <Text style={styles.itemTitle}>{t('weight.quiz')}</Text>
          <TextInput
            style={styles.input}
            value={quiz}
            onChangeText={setQuiz}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputRow}>
          <Text style={styles.itemTitle}>{t('weight.attendance')}</Text>
          <TextInput
            style={styles.input}
            value={attendance}
            onChangeText={setAttendance}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputRow}>
          <Text style={styles.itemTitle}>{t('weight.assignment')}</Text>
          <TextInput
            style={styles.input}
            value={assignment}
            onChangeText={setAssignment}
            keyboardType="numeric"
          />
        </View>

        <TouchableOpacity
          style={styles.appButtonContainer}
          onPress={handleSave}
          disabled={saving}
        >
          <Text style={styles.appButtonText}>
            {saving ? t('weight.saving') : t('weight.save')}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
