import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import styles from '../../style/stuManageStyle/studentDetailStyle';
import BackButton from '../../components/BackButton';
import { useTranslation } from 'react-i18next';

const allChapters = [
  { chapter: "Chapter1_01", title: "Chapter1_01" },
  { chapter: "Chapter1_02", title: "Chapter1_02" },
  { chapter: "Chapter1_03", title: "Chapter1_03" },
  { chapter: "Chapter2_01", title: "Chapter2_01" },
  { chapter: "Chapter2_02", title: "Chapter2_02" },
  { chapter: "Chapter2_03", title: "Chapter2_03" },
];

export default function StudentDetail() {
  const { id } = useLocalSearchParams();
  const [student, setStudent] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [deadlines, setDeadlines] = useState([]);
  const [chapterScores, setChapterScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { t } = useTranslation();

  const fetchStudent = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await axios.get(`http://localhost:5000/api/students/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStudent(res.data);
    } catch (err) {
      console.error(t('studentDetail.noStudentInfo'), err.response?.data || err.message);
    }
  };

  const fetchAttendance = async (studentId) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await axios.get(`http://localhost:5000/api/attendance/student/${studentId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success && res.data.records) {
        setAttendance(res.data.records);
      } else {
        setAttendance([]);
      }
    } catch (err) {
      console.error(t('studentDetail.attendanceStatus'), err.response?.data || err.message);
    }
  };

  const fetchAssignments = async (studentId) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await axios.get(`http://localhost:5000/api/students/${studentId}/results`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAssignments(res.data.assignments || []);
    } catch (err) {
      console.error(t('studentDetail.assignmentStatus'), err.response?.data || err.message);
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
      console.error('데드라인 정보 요청 실패:', err);
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
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchStudent();
      await fetchAttendance(id);
      await fetchAssignments(id);
      await fetchDeadlines();
      await fetchTotalScore(id); 
      await fetchAllChapterScores(id);
      setLoading(false);
    };
    fetchData();
  }, [id]);

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;

  if (!student) {
    return (
      <View style={styles.container}>
        <Text style={styles.infoText}>{t('studentDetail.noStudentInfo')}</Text>
      </View>
    );
  }

  const getAttendanceStatus = (chapter) => {
    const attendanceObj = attendance.find(a => a.chapter === chapter);
    const deadlineObj = deadlines.find(d => d.chapter === chapter);

    if (attendanceObj) return attendanceObj.status;
    if (deadlineObj && new Date(deadlineObj.deadline) < new Date()) return '결석';
    if (deadlineObj) return '미완료';
    return '정보 없음';
  };

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
    <View>
      <BackButton onPress={() => router.replace('/stuManage/stuManageScreen')} />
      <ScrollView
        style={styles.container}
        scrollEnabled={true}
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        <Text style={styles.title}>{t('result.titleWithName', { name: student.nickname })}</Text>

        <View style={styles.card}>
          <Text style={styles.name}>{student.nickname}</Text>
          <Text style={styles.infoText}>{t('studentDetail.studentNumber')}: {student.studentNumber}</Text>
          <Text style={styles.infoText}>{t('studentDetail.class')}: {student.classId}</Text>
          <Text style={styles.infoText}>{t('studentDetail.school')}: {student.school}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>📚 {t('result.subjectScores')}</Text>
          {allChapters.map((ch, idx) => {
            const scoreObj = chapterScores.find(s => s.chapter === ch.chapter);
            const total = (scoreObj?.totalScore ?? 0);
            const quiz = (scoreObj?.quizScore ?? 0);
            const attendance = (scoreObj?.attendanceScore ?? 0);
            const assignment = (scoreObj?.assignmentScore ?? 0);
            return (
              <Text key={ch.chapter} style={styles.subjectText}>
                {t('result.subjectLine', {
                  chapter: ch.title,
                  score: total,
                  quiz,
                  attendance,
                  assignment
                })}
              </Text>
            );
          })}
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>🕘 {t('result.attendanceStatus')}</Text>
          <Text style={[styles.tag, styles.tagPresent]}>
            {t('result.present')}: {attendanceCounts.출석}{t('result.unit')}
          </Text>
          <Text style={[styles.tag, styles.tagLate]}>
            {t('result.late')}: {attendanceCounts.지각}{t('result.unit')}
          </Text>
          <Text style={[styles.tag, styles.tagAbsent]}>
            {t('result.absent')}: {attendanceCounts.결석}{t('result.unit')}
          </Text>
          <Text style={[styles.tag, styles.tagAbsent]}>
            {t('result.incomplete')}: {attendanceCounts.미완료}{t('result.unit')}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>📝 {t('result.assignmentStatus')}</Text>
          {assignments.length > 0 ? (
            assignments.map((item, idx) => (
              <Text key={idx} style={styles.assignmentText}>
                {t('result.submissionLine', {
                  title: item.title,
                  status: item.status === '제출'
                    ? t('result.submitted')
                    : t('result.notSubmitted')
                })}
                {item.score && (
                  <Text style={styles.scoreTag}> ({item.score}{t('studentDetail.scoreUnit')})</Text>
                )}
              </Text>
            ))
          ) : (
            <Text style={styles.assignmentText}>{t('studentDetail.noAssignmentInfo')}</Text>
          )}
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>{t('studentDetail.feedbackTitle')}</Text>
          <Text style={styles.feedbackText}>{t('studentDetail.teacherComment')}</Text>
        </View>
      </ScrollView>
    </View>
  );
}
