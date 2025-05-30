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

const allChapters = [
  { chapter: "Chapter1_01", title: "Chapter1_01" },
  { chapter: "Chapter1_02", title: "Chapter1_02" },
  { chapter: "Chapter1_03", title: "Chapter1_03" }
];

export default function StuResultScreen() {
  const { studentId } = useLocalSearchParams();
  const router = useRouter();

  const [student, setStudent] = useState({});
  const [assignments, setAssignments] = useState([]);
  const [results, setResults] = useState(null);
  const [deadlines, setDeadlines] = useState([]);
  const [attendanceList, setAttendanceList] = useState([]);
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
      setError('과제를 불러올 수 없습니다.');
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
      setAttendanceList(res.data.records);
    } else {
      setAttendanceList([]);
    }
    } catch (err) {
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
      console.error('데드라인 정보 요청 실패:', err);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('ko-KR');
  };

  useEffect(() => {
    fetchStudentInfo();
    fetchAssignments();
    fetchResults();
    fetchAttendance(studentId);
    fetchDeadlines();
  }, [studentId]);

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  }

  const getAttendanceStatus = (chapter) => {
    // 출석/지각 기록에서 해당 챕터 찾기
    console.log('입력받은 chapter:', chapter);
    const attendanceObj = Array.isArray(attendanceList)
      ? attendanceList.find(a => a.chapter === chapter)
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

  if (loading) return <ActivityIndicator size="large" />;

  const attendanceCounts = countAttendance();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => router.push('/ProfileScreen')} style={styles.backButton}>
      <Ionicons name="arrow-back" size={20} color="#fff" />
      </TouchableOpacity>


      {/* 🧑‍🎓 Header Title */}
      <View style={styles.card}>
        <Text style={styles.headerTitle}>
          {student.name ? `${student.name}님의 성적표` : '학생 성적 정보'}
        </Text>
      </View>

      {/* 📚 과목별 성적 */}
      <View style={styles.card}>
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionIcon}>📚</Text>
          <Text style={styles.sectionTitleText}>과목별 성적</Text>
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
              최종 점수: {subject.score}점
            </Text>
          </View>
        ))}
      </View>

      {/* 📅 출결 현황 */}
      <View style={styles.card}>
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

      {/* 📝 과제 현황 */}
      <View style={styles.card}>
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionIcon}>📝</Text>
          <Text style={styles.sectionTitleText}>과제 현황</Text>
        </View>
        {assignments.length === 0 && (
          <Text style={styles.emptyText}>등록된 과제가 없습니다.</Text>
        )}
        {assignments.map((assignment, index) => (
          <View key={assignment._id || index} style={styles.assignmentCard}>
            <View style={styles.assignmentInfo}>
              <Text style={styles.itemTitle}>
                {assignment.title}
                {assignment.description
                  ? ` || ${assignment.description}`
                  : ''}
                {assignment.dueDate
                  ? ` || ${formatDate(assignment.dueDate)}`
                  : ''}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.detailButtonWrapper}
              onPress={() => router.push(`/assignments/${assignment._id}`)}
            >
              <Text style={styles.detailButtonText}>상세보기</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}
    </ScrollView>
  );
}
