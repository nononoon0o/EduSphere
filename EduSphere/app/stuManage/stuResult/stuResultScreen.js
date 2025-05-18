import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function StuResultScreen() {
  const { studentId } = useLocalSearchParams();
  const router = useRouter();

  const [assignments, setAssignments] = useState([]);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  // 과제 목록 불러오기
  const fetchAssignments = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/assignments', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAssignments(res.data);
    } catch (err) {
      setError('과제를 불러올 수 없습니다.');
    }
  };
  
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('ko-KR');
  };

  useEffect(() => {
    fetchAssignments();
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
        {assignments.map((assignment, index) => (
          <View key={assignment._id || index} style={styles.assignmentRow}>
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
              <Text style={styles.detailButtonText}>상세보기</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  section: {
    marginBottom: 30
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15
  },
  item: { 
    padding: 15, 
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    marginBottom: 10
  },
  subject: {
    fontWeight: '600',
    marginBottom: 5
  },
  assignmentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#00A8FF',
    paddingHorizontal: 10,
    height: 50,
    justifyContent: 'space-between',
  },
  assignmentInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  detailButtonWrapper: {
    marginLeft: 10,
    backgroundColor: '#00A8FF',
    borderRadius: 5,
    height: 35,
    minWidth: 80,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  detailButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  }
});
