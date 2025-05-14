import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function StuResultScreen() {
  const { studentId } = useLocalSearchParams();
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(studentId);
    const fetchResults = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const res = await axios.get(`http://localhost:5000/api/students/${studentId}/results`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setResults(res.data);
      } catch (error) {
        console.error("학습 결과 불러오기 실패:", error);
        console.error(results)
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [studentId]);

  if (loading) return <ActivityIndicator size="large" />;

  return (
    <ScrollView style={styles.container}>
      {/* 과목별 성적 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📚 과목별 성적</Text>
        {results.subjects.map((subject, index) => (
          <View key={index} style={styles.item}>
            <Text style={styles.subject}>{subject.name}</Text>
            <Text>최종 점수: {subject.score}점</Text>
          </View>
        ))}
      </View>

      {/* 출결 현황 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📅 출결 현황</Text>
        <Text>출석: {results.attendance.present}일</Text>
        <Text>지각: {results.attendance.late}일</Text>
        <Text>결석: {results.attendance.absent}일</Text>
      </View>

      {/* 과제 제출 현황 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📝 과제 현황</Text>
        {results.assignments.map((assignment, index) => (
          <View key={index} style={styles.item}>
            <Text>{assignment.title}</Text>
            <Text>상태: {assignment.status}</Text>
            <Text>점수: {assignment.score || '미채점'}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  section: { marginBottom: 30 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
  item: { 
    padding: 15, 
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    marginBottom: 10
  },
  subject: { fontWeight: '600', marginBottom: 5 }
});
