import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AssignmentDetailScreen() {
  const { id } = useLocalSearchParams();
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const res = await axios.get(`http://localhost:5000/api/assignments/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAssignment(res.data.assignment);
      } catch (err) {
        setError('과제 정보를 불러올 수 없습니다.');
      } finally {
        setLoading(false);
      }
    };
    fetchAssignment();
  }, [id]);

  if (loading) return <ActivityIndicator size="large" />;
  if (error) return <Text style={styles.error}>{error}</Text>;
  if (!assignment) return <Text>과제 정보를 찾을 수 없습니다.</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{assignment.title}</Text>
      <Text style={styles.label}>설명:</Text>
      <Text style={styles.text}>{assignment.description}</Text>
      <Text style={styles.label}>마감일:</Text>
      <Text style={styles.text}>{assignment.dueDate ? new Date(assignment.dueDate).toLocaleDateString('ko-KR') : '-'}</Text>
      {/* 필요시 제출 현황 등 추가 */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 15 },
  label: { fontWeight: 'bold', marginTop: 10 },
  text: { fontSize: 16, marginTop: 2 },
  error: { color: 'red', textAlign: 'center', marginTop: 20 },
});
