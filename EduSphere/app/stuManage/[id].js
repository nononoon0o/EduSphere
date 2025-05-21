import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function StudentDetail() {
  const { id } = useLocalSearchParams();
  const [student, setStudent] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const router = useRouter();

  const fetchStudent = async () => {
    const token = await AsyncStorage.getItem('token');
    const res = await axios.get(`http://localhost:5000/api/students/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setStudent(res.data);
  };

  const fetchAttendance = async (studentId) => {
    const token = await AsyncStorage.getItem('token');
    const res = await axios.get(`http://localhost:5000/api/students/${studentId}/results`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log(res.data)
      console.log(res.data.attendance)
      setAttendance(res.data.attendance);
  };

  const fetchAssignments = async (studentId) => {
    const token = await AsyncStorage.getItem('token');
    const res = await axios.get(`http://localhost:5000/api/students/${studentId}/results`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAssignments(res.data.assignments);
  };

  useEffect(() => {
    fetchStudent();
    fetchAttendance(id);
    fetchAssignments(id);
  }, [id]);

  if (!student) return <Text>로딩 중...</Text>;

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{student.nickname}</Text>
      <Text>학번: {student.studentNumber}</Text>
      <Text>반: {student.classId}</Text>
      <Text>학교: {student.school}</Text>
      <Text style={{ marginTop: 16, fontWeight: 'bold' }}>수강 과목 및 성적</Text>
      {student.subjects && student.subjects.length > 0 ? (
        student.subjects.map((s, idx) => (
          <Text key={idx}>{s.name}: {s.score}점</Text>
        ))
      ) : (
        <Text>수강 과목 정보 없음</Text>
      )}

      <Text style={{ marginTop: 16, fontWeight: 'bold' }}>출결 현황</Text>
      {attendance && Object.entries(attendance).map(([status, count]) => (
        <Text key={status}>
          {status === 'present' ? '출석' : status === 'late' ? '지각' : '결석'}: {count}회
        </Text>
      ))}
      <Text style={{ marginTop: 16, fontWeight: 'bold' }}>과제 제출 현황</Text>
      {Array.isArray(assignments) && assignments.length > 0 ? (
        assignments.map((item, idx) => (
          <Text key={idx}>{item.title}: {item.submitted ? '제출' : '미제출'} {item.score && `(${item.score}점)`}</Text>
        ))
      ) : (
        <Text>과제 정보 없음</Text>
      )}
      <Text style={{ marginTop: 16, fontWeight: 'bold' }}>피드백</Text>
      <Text>교사 코멘트 (추후 연동)</Text>
    </ScrollView>
  );
}
