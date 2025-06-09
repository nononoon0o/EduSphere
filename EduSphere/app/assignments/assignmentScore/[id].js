import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dropdown } from 'react-native-element-dropdown';
import { useLocalSearchParams, useRouter } from 'expo-router';
import styles from '../../../style/assignments/assignmentsScoreStyle';
import { useTranslation } from 'react-i18next';

export default function AssignmentScoreStudent() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { t } = useTranslation();

  const [student, setStudent] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStudentAndAssignments = async () => {
    const token = await AsyncStorage.getItem('token');
    // 학생 정보
    const stuRes = await axios.get(`http://localhost:5000/api/students/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setStudent(stuRes.data);

    // 전체 과제 목록
    const asnRes = await axios.get('http://localhost:5000/api/assignments', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const assignmentList = asnRes.data.map((a) => ({
      label: a.title,
      value: a._id,
    }));
    setAssignments(assignmentList);
    setLoading(false);
  };

  const fetchSubmissions = async () => {
    if (!selectedAssignment) {
      setSubmissions([]);
      return;
    }
    const token = await AsyncStorage.getItem('token');
    const res = await axios.get(
      `http://localhost:5000/api/assignments/${selectedAssignment}/submission/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setSubmissions(res.data.submissions || []);
  };

  // 특정 과제 선택 시 제출물 목록 fetch
  useEffect(() => {
    fetchStudentAndAssignments();
    fetchSubmissions();
  }, [selectedAssignment, id]);

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;

  return (
    <ScrollView style={styles.container}>
      {/* 학생 이름 */}
      <Text style={styles.title}>
        {student ? `${student.nickname || student.name}의 제출물 목록` : ''}
      </Text>

      {/* 드롭박스: 과제 선택 */}
      <Dropdown
        style={styles.dropdown}
        data={assignments}
        labelField="label"
        valueField="value"
        placeholder={t('submit.selectAssignment')}
        value={selectedAssignment}
        onChange={(item) => setSelectedAssignment(item.value)}
        maxHeight={300}
      />

      {/* 제출물 목록 보여주기 */}
      {selectedAssignment && (
        <View style={styles.card}>
          {submissions.length > 0 ? (
            submissions.map((sub, idx) => (
              <View key={idx} style={styles.submissionRow}>
                <Text style={styles.assignmentContent}>제출 제목: {sub.stuTitle}</Text>
                <Text style={styles.assignmentContent}>내용: {sub.stuContent}</Text>
                {sub.stufileUrl && (
                  <Text
                    style={[styles.assignmentContent, { color: '#2563EB', textDecorationLine: 'underline' }]}
                    onPress={() => {
                      // 파일 확인용. 실제 앱에서는 Linking 사용
                      window.open(sub.stufileUrl, '_blank');
                    }}
                  >
                    파일 링크
                  </Text>
                )}
                {/* 점수 및 기타 정보 */}
                <Text style={styles.assignmentContent}>점수: {sub.score !== undefined && sub.score !== null ? `${sub.score}점` : '미채점'}</Text>
                <Text style={styles.assignmentContent}>제출일: {sub.submittedAt ? new Date(sub.submittedAt).toLocaleString() : "제출 정보 없음"}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>제출물이 없습니다.</Text>
          )}
        </View>
      )}
    </ScrollView>
  );
}
