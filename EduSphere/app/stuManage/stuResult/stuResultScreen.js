import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../../style/stuResult/stuResultScreenStyle';
import BackButton from '../../../components/BackButton';
import { useTranslation } from 'react-i18next';

const allChapters = [
  { chapter: "Chapter1_01", title: "Chapter1_01" },
  { chapter: "Chapter1_02", title: "Chapter1_02" },
  { chapter: "Chapter1_03", title: "Chapter1_03" },
  { chapter: "Chapter2_01", title: "Chapter2_01" },
  { chapter: "Chapter2_02", title: "Chapter2_02" },
  { chapter: "Chapter2_03", title: "Chapter2_03" },
];

export default function StuResultScreen() {
  const { studentId } = useLocalSearchParams();
  const router = useRouter();
  const { t } = useTranslation();

  const [student, setStudent] = useState({});
  const [assignments, setAssignments] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [deadlines, setDeadlines] = useState([]);
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

  const fetchAttendance = async (studentId) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await axios.get(
        `http://localhost:5000/api/attendance/student/${studentId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success && res.data.records) {
        setAttendance(res.data.records);
      } else {
        setAttendance([]);
      }
    } catch (err) {
      setError('출석 기록 불러오기 실패')
      console.error('출석 기록 불러오기 실패:', err);
    }
  };

  const fetchDeadlines = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/deadlines/all', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDeadlines(res.data.deadlines || []);
    } catch (err) {
      setError('데드라인 기록 불러오기 실패')
      console.error('데드라인 정보 요청 실패:', err);
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

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString();
  };

  useEffect(() => {
    fetchStudentInfo();
    fetchAssignments();
    fetchAttendance(studentId);
    fetchDeadlines();
    fetchResults();
  }, [studentId]);

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  }

  const getAttendanceStatus = (chapter) => {
    // 출석/지각 기록에서 해당 챕터 찾기
    const attendanceObj = Array.isArray(attendance)
      ? attendance.find(a => a.chapter === chapter)
      : null;
    // 데드라인에서 해당 챕터 찾기
    const deadlineObj = Array.isArray(deadlines)
      ? deadlines.find(d => d.chapter === chapter)
      : null;

    if (attendanceObj) {
      return attendanceObj.status; // '출석' 또는 '지각'
    } else if (deadlineObj && new Date(deadlineObj.deadline) < new Date()) {
      return "결석"; // 데드라인 지났고 기록 없으면 결석
    } else if (deadlineObj) {
      return "미완료"; // 데드라인 안 지났고 기록 없으면 미완료
    } else {
      return "정보 없음";
    }
  };

  // 챕터별 출결 상태 집계
  const countAttendance = () => {
    const counts = { 출석: 0, 지각: 0, 결석: 0, 미완료: 0 };
    allChapters.forEach(ch => {
      const status = getAttendanceStatus(ch.chapter);
      if (status === '출석') counts.출석 += 1;
      else if (status === '지각') counts.지각 += 1;
      else if (status === '결석') counts.결석 += 1;
      else if (status === '미완료') counts.미완료 += 1;
    });
    return counts;
  };
  
  const attendanceCounts = countAttendance();

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
            {t('result.present')}: {attendanceCounts.출석}{t('result.days')}
          </Text>
          <Text style={[styles.tag, styles.tagLate]}>
            {t('result.late')}: {attendanceCounts.지각}{t('result.days')}
          </Text>
          <Text style={[styles.tag, styles.tagAbsent]}>
            {t('result.absent')}: {attendanceCounts.결석}{t('result.days')}
          </Text>
          <Text style={[styles.tag, styles.tagAbsent]}>
            미완료: {attendanceCounts.미완료}개
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
