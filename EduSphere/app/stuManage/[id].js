import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import styles from '../../style/stuManageStyle/studentDetailStyle';
import BackButton from '../../components/BackButton'; // ✅ Import reusable back button

const allChapters = [
  { chapter: "Chapter1_01", title: "Chapter1_01" },
  { chapter: "Chapter1_02", title: "Chapter1_02" },
  { chapter: "Chapter1_03", title: "Chapter1_03" }
];

export default function StudentDetail() {
  const { id } = useLocalSearchParams();
  const [student, setStudent] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [deadlines, setDeadlines] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchStudent = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await axios.get(`http://localhost:5000/api/students/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStudent(res.data);
    } catch (err) {
      console.error('학생 정보 요청 실패:', err.response?.data || err.message);
    }
  };

  const fetchAttendance = async (studentId) => {
    console.log('서버에 요청하는 studentId:', studentId);
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await axios.get(`http://localhost:5000/api/students/${studentId}/results`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success && res.data.records) {
        setAttendance(res.data.records);
      } else {
        setAttendance([]);
      }
    } catch (err) {
      console.error('출결 정보 요청 실패:', err.response?.data || err.message);
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
      console.error('과제 정보 요청 실패:', err.response?.data || err.message);
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
        <Text style={styles.infoText}>학생 정보를 불러올 수 없습니다.</Text>
      </View>
    );
  }

  const getAttendanceStatus = (chapter) => {
    // 출석/지각 기록에서 해당 챕터 찾기
    console.log('입력받은 chapter:', chapter);
    const attendanceObj = Array.isArray(attendance)
      ? attendance.find(a => a.chapter === chapter)
      : null;
    console.log('찾은 attendanceObj:', attendanceObj);
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
       <BackButton onPress={() => router.back()} />
    <ScrollView style={styles.container}>
     

      <View style={styles.card}>
        <Text style={styles.name}>{student.nickname}</Text>
        <Text style={styles.infoText}>학번: {student.studentNumber}</Text>
        <Text style={styles.infoText}>반: {student.classId}</Text>
        <Text style={styles.infoText}>학교: {student.school}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>📚 수강 과목 및 성적</Text>
        {student.subjects?.length > 0 ? (
          student.subjects.map((s, idx) => (
            <Text key={idx} style={styles.subjectText}>
              {s.name}: <Text style={styles.scoreTag}>{s.score}점</Text>
            </Text>
          ))
        ) : (
          <Text style={styles.subjectText}>수강 과목 정보 없음</Text>
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>🕘 출결 현황</Text>
        {attendance && Object.entries(attendance).map(([status, count]) => {
          const label = status === 'present' ? '출석' : status === 'late' ? '지각' : '결석';
          const tagStyle = status === 'present' ? styles.tagGreen :
                           status === 'late' ? styles.tagYellow : styles.tagRed;

          return (
            <Text key={status} style={styles.attendanceText}>
              {label}: <Text style={tagStyle}>{count}회</Text>
            </Text>
          );
        })}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionIcon}>📅</Text>
          <Text style={styles.sectionTitleText}>출결 현황</Text>
        </View>
        <View style={styles.attendanceTagWrapper}>
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
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>📝 과제 제출 현황</Text>
        {assignments.length > 0 ? (
          assignments.map((item, idx) => (
            <Text key={idx} style={styles.assignmentText}>
              {item.title}: 
              <Text style={item.submitted ? styles.tagGreen : styles.tagRed}>
                {item.submitted ? ' 제출' : ' 미제출'}
              </Text>
              {item.score && <Text style={styles.scoreTag}> ({item.score}점)</Text>}
            </Text>
          ))
        ) : (
          <Text style={styles.assignmentText}>과제 정보 없음</Text>
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>💬 피드백</Text>
        <Text style={styles.feedbackText}>교사 코멘트 (추후 연동)</Text>
      </View>
    </ScrollView>
    </View>
  );
}
