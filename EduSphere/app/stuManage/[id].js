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

  useEffect(() => {
    const fetchData = async () => {
      await fetchStudent();
      await fetchAttendance(id);
      await fetchAssignments(id);
      await fetchDeadlines();
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
      <ScrollView style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.name}>{student.nickname}</Text>
          <Text style={styles.infoText}>{t('studentDetail.studentNumber')}: {student.studentNumber}</Text>
          <Text style={styles.infoText}>{t('studentDetail.class')}: {student.classId}</Text>
          <Text style={styles.infoText}>{t('studentDetail.school')}: {student.school}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>📚 {t('studentDetail.subjectScores')}</Text>
          {student.subjects?.length > 0 ? (
            student.subjects.map((s, idx) => (
              <Text key={idx} style={styles.subjectText}>
                {s.name}: <Text style={styles.scoreTag}>{s.score}{t('studentDetail.scoreUnit')}</Text>
              </Text>
            ))
          ) : (
            <Text style={styles.subjectText}>{t('studentDetail.noSubjectInfo')}</Text>
          )}
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>🕘 {t('studentDetail.attendanceStatus')}</Text>
          <Text style={[styles.tag, styles.tagPresent]}>
            출석: {attendanceCounts.출석}개
          </Text>
          <Text style={[styles.tag, styles.tagLate]}>
            지각: {attendanceCounts.지각}개
          </Text>
          <Text style={[styles.tag, styles.tagAbsent]}>
            결석: {attendanceCounts.결석}개
          </Text>
          <Text style={[styles.tag, styles.tagAbsent]}>
            미완료: {attendanceCounts.미완료}개
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>📝 {t('studentDetail.assignmentStatus')}</Text>
          {assignments.length > 0 ? (
            assignments.map((item, idx) => (
              <Text key={idx} style={styles.assignmentText}>
                {item.title}: 
                <Text style={item.status === '제출' ? styles.tagGreen : styles.tagRed}>
                  {item.status === '제출' ? t('studentDetail.submitted') : t('studentDetail.notSubmitted')}
                </Text>
                {item.score && <Text style={styles.scoreTag}> ({item.score}{t('studentDetail.scoreUnit')})</Text>}
              </Text>
            ))
          ) : (
            <Text style={styles.assignmentText}>{t('studentDetail.noAssignmentInfo')}</Text>
          )}
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>💬 {t('studentDetail.feedback')}</Text>
          <Text style={styles.feedbackText}>{t('studentDetail.teacherComment')}</Text>
        </View>
      </ScrollView>
    </View>
  );
}
