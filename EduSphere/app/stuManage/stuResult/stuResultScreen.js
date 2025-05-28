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

export default function StuResultScreen() {
  const { studentId } = useLocalSearchParams();
  const router = useRouter();

  const [student, setStudent] = useState({});
  const [assignments, setAssignments] = useState([]);
  const [results, setResults] = useState(null);
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

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('ko-KR');
  };

  useEffect(() => {
    fetchStudentInfo();
    fetchAssignments();
    fetchResults();
  }, [studentId]);

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  }

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
            출석: {results?.attendance?.present || 0}일
          </Text>
          <Text style={[styles.tag, styles.tagLate]}>
            지각: {results?.attendance?.late || 0}일
          </Text>
          <Text style={[styles.tag, styles.tagAbsent]}>
            결석: {results?.attendance?.absent || 0}일
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
