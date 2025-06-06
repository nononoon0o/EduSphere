import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../../style/stuResult/stuResultScreenStyle';
import BackButton from '../../../components/BackButton';
import { useTranslation } from 'react-i18next';

export default function StuResultScreen() {
  const { studentId } = useLocalSearchParams();
  const router = useRouter();
  const { t } = useTranslation();

  const [student, setStudent] = useState({});
  const [assignments, setAssignments] = useState([]);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchStudentInfo = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await axios.get(
        `http://localhost:5000/api/students/${studentId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setStudent(res.data);
    } catch (err) {
      console.error('학생 정보 불러오기 실패:', err);
    }
  };

  const fetchResults = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await axios.get(
        `http://localhost:5000/api/students/${studentId}/results`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setResults(res.data);
    } catch (err) {
      console.error('학습 결과 불러오기 실패:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAssignments = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/assignments', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAssignments(res.data);
    } catch (err) {
      setError(t('result.errorFetchingAssignments'));
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString();
  };

  useEffect(() => {
    fetchStudentInfo();
    fetchAssignments();
    fetchResults();
  }, [studentId]);

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <BackButton onPress={() => router.push('/ProfileScreen')} />

      <View style={styles.card}>
        <Text style={styles.headerTitle}>
          {student.name
            ? t('result.titleWithName', { name: student.name })
            : t('result.title')}
        </Text>
      </View>

      {/* 📚 Subject Scores */}
      <View style={styles.card}>
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionIcon}>📚</Text>
          <Text style={styles.sectionTitleText}>{t('result.subjectScores')}</Text>
        </View>
        {results?.subjects?.map((subject, index) => (
          <View key={index} style={styles.scoreBox}>
            <Text style={styles.subject}>{subject.name}</Text>
            <Text
              style={[
                styles.score,
                { color: subject.score < 60 ? '#DC2626' : '#10B981' },
              ]}
            >
              {t('result.finalScore')}: {subject.score}{t('result.points')}
            </Text>
          </View>
        ))}
      </View>

      {/* 📅 Attendance */}
      <View style={styles.card}>
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionIcon}>📅</Text>
          <Text style={styles.sectionTitleText}>{t('result.attendanceStatus')}</Text>
        </View>
        <View style={styles.attendanceTagWrapper}>
          <Text style={[styles.tag, styles.tagPresent]}>
            {t('result.present')}: {results?.attendance?.present || 0}{t('result.days')}
          </Text>
          <Text style={[styles.tag, styles.tagLate]}>
            {t('result.late')}: {results?.attendance?.late || 0}{t('result.days')}
          </Text>
          <Text style={[styles.tag, styles.tagAbsent]}>
            {t('result.absent')}: {results?.attendance?.absent || 0}{t('result.days')}
          </Text>
        </View>
      </View>

      {/* 📝 Assignments */}
      <View style={styles.card}>
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionIcon}>📝</Text>
          <Text style={styles.sectionTitleText}>{t('result.assignmentStatus')}</Text>
        </View>
        {assignments.length === 0 && (
          <Text style={styles.emptyText}>{t('result.noAssignments')}</Text>
        )}
        {assignments.map((assignment, index) => (
          <View key={assignment._id || index} style={styles.assignmentCard}>
            <View style={styles.assignmentInfo}>
              <Text style={styles.itemTitle}>
                {assignment.title}
                {assignment.description ? ` || ${assignment.description}` : ''}
                {assignment.dueDate ? ` || ${formatDate(assignment.dueDate)}` : ''}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.detailButtonWrapper}
              onPress={() => router.push(`/assignments/${assignment._id}`)}
            >
              <Text style={styles.detailButtonText}>{t('result.viewDetails')}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}
    </ScrollView>
  );
}
