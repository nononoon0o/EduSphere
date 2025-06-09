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
  const [chapterScores, setChapterScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchStudent = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await axios.get(`http://localhost:5000/api/students/${studentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
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
      const res = await axios.get(`http://localhost:5000/api/attendance/student/${studentId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAttendance(res.data.success ? res.data.records : []);
    } catch (err) {
      setError('출석 기록 불러오기 실패');
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
      setError('데드라인 기록 불러오기 실패');
    }
  };

  const fetchTotalScore = async (studentId, chapter) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await axios.get(`http://localhost:5000/api/scores/${studentId}/${chapter}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return { chapter, ...res.data };
    } catch (err) {
      return { chapter, totalScore: null };
      console.error('점수 정보 요청 실패:', err)
    }
  };

  const fetchAllChapterScores = async (studentId) => {
    const scoreResults = [];
    for (const ch of allChapters) {
      const result = await fetchTotalScore(studentId, ch.chapter);
      scoreResults.push(result);
    }
    setChapterScores(scoreResults);
    setLoading(false);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString();
  };

  useEffect(() => {
    fetchStudent();
    fetchAssignments();
    fetchAttendance(studentId);
    fetchTotalScore(studentId); 
    fetchAllChapterScores(studentId);
    fetchDeadlines();
  }, [studentId]);

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  }

  const getAttendanceStatus = (chapter) => {
    const attendanceObj = Array.isArray(attendance)
      ? attendance.find(a => a.chapter === chapter)
      : null;
    const deadlineObj = Array.isArray(deadlines)
      ? deadlines.find(d => d.chapter === chapter)
      : null;

    if (attendanceObj) return attendanceObj.status;
    else if (deadlineObj && new Date(deadlineObj.deadline) < new Date()) return t('result.absent');
    else if (deadlineObj) return t('result.incomplete');
    else return t('result.unknown');
  };

  const countAttendance = () => {
    const counts = {
      [t('result.present')]: 0,
      [t('result.late')]: 0,
      [t('result.absent')]: 0,
      [t('result.incomplete')]: 0,
    };
    allChapters.forEach(ch => {
      const status = getAttendanceStatus(ch.chapter);
      if (counts[status] !== undefined) counts[status] += 1;
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
        {allChapters.map((ch, idx) => {
          const scoreObj = chapterScores.find(s => s.chapter === ch.chapter);
          const total = (scoreObj?.totalScore ?? 0);
          const quiz = (scoreObj?.quizScore ?? 0);
          const attendance = (scoreObj?.attendanceScore ?? 0);
          const assignment = (scoreObj?.assignmentScore ?? 0);
          return (
            <Text key={ch.chapter} style={styles.subjectText}>
              {ch.title}: {`${total}점 (평가:${quiz} 출결:${attendance} 과제:${assignment})`}
            </Text>
          );
        })}
      </View>

      {/* 📅 Attendance */}
      <View style={styles.card}>
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionIcon}>📅</Text>
          <Text style={styles.sectionTitleText}>{t('result.attendanceStatus')}</Text>
        </View>
        <View style={styles.attendanceTagWrapper}>
          <Text style={[styles.tag, styles.tagPresent]}>
            {t('result.present')}: {attendanceCounts[t('result.present')]}{t('result.days')}
          </Text>
          <Text style={[styles.tag, styles.tagLate]}>
            {t('result.late')}: {attendanceCounts[t('result.late')]}{t('result.days')}
          </Text>
          <Text style={[styles.tag, styles.tagAbsent]}>
            {t('result.absent')}: {attendanceCounts[t('result.absent')]}{t('result.days')}
          </Text>
          <Text style={[styles.tag, styles.tagAbsent]}>
            {t('result.incomplete')}: {attendanceCounts[t('result.incomplete')]}
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
                {t('result.assignmentTitle')} {index + 1} ||{" "}
                {assignment.description
                  ? assignment.description
                  : t('result.assignmentRequest', { chapter: index + 1 })}
                {" || "}
                {assignment.dueDate ? formatDate(assignment.dueDate) : ''}
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
