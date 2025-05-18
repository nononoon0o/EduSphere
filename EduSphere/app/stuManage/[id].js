import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function StudentDetail() {
  const { id } = useLocalSearchParams();
  const [student, setStudent] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchStudent = async () => {
      const token = await AsyncStorage.getItem('token');
      const res = await axios.get(`http://localhost:5000/api/students/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStudent(res.data);
    };
    fetchStudent();
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

      {/* 출결, 과제, 피드백 등은 아래처럼 확장 */}
      <Text style={{ marginTop: 16, fontWeight: 'bold' }}>출결 현황</Text>
      {/*
        출결 정보 백엔드 구조
        POST / → 출결 기록 생성 (교사용)
        GET /student/:studentId → 학생별 출결 조회
      */}
      <Text>출석/지각/결석 정보 (추후 연동)</Text>
      <Text style={{ marginTop: 16, fontWeight: 'bold' }}>과제 제출 현황</Text>
      {/* 
        과제 정보 백엔드 구조
        POST / → 과제 생성 (교사용)
        POST /:id/submit → 과제 제출 (학생용)
        GET /:id → 특정 과제 조회
      */}
      <Text>과제 정보 (추후 연동)</Text>
      <Text style={{ marginTop: 16, fontWeight: 'bold' }}>피드백</Text>
      <Text>교사 코멘트 (추후 연동)</Text>
    </ScrollView>
  );
}
