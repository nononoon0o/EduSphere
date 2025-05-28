import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import styles from '../../style/stuManageStyle/studentDetailStyle';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function StudentDetail() {
  const { id } = useLocalSearchParams();
  const [student, setStudent] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [assignments, setAssignments] = useState([]);
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
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await axios.get(`http://localhost:5000/api/students/${studentId}/results`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAttendance(res.data.attendance || []);
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

  useEffect(() => {
    const fetchData = async () => {
      await fetchStudent();
      await fetchAttendance(id);
      await fetchAssignments(id);
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

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Icon name="arrow-left" size={20} color="#1F2937" />
      </TouchableOpacity>

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
  );
}
