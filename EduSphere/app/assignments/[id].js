import React, { useEffect, useState, useRef } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AssignmentDetailScreen() {
  const { id } = useLocalSearchParams();
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchAssignment = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await axios.get(`http://localhost:5000/api/assignments/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.data || !res.data.assignment) {
        setError('과제 정보를 불러올 수 없습니다.');
        setAssignment(null);
        return;
      }
      setAssignment(res.data.assignment);
    } catch (err) {
      setError('과제 정보를 불러올 수 없습니다.');
      setAssignment(null);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignment();
  }, [id]);

  if (loading) return <ActivityIndicator size="large" />;
  if (error) return <Text style={styles.error}>{error}</Text>;
  if (!assignment) return <Text>과제 정보를 찾을 수 없습니다.</Text>;

  const handleDownload = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const fileId = assignment.teafileId;
      const url = `http://localhost:5000/api/assignments/files/${fileId}`;
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!response.ok) {
        alert('파일 다운로드 실패');
        return;
      }
      const blob = await response.blob();

      const filename = assignment.teafileId ? `${assignment.teafileId}.docx` : '첨부파일.docx';
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = filename;
      link.click();
    } catch (err) {
      alert('파일 다운로드 중 오류가 발생했습니다.');
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{assignment.title}</Text>
      <Text style={styles.label}>설명:</Text>
      <Text style={styles.text}>{assignment.description}</Text>
      <Text style={styles.label}>마감일:</Text>
      <Text style={styles.text}>{assignment.dueDate ? new Date(assignment.dueDate).toLocaleDateString('ko-KR') : '-'}</Text>
      {assignment.teafileId && (
        <TouchableOpacity onPress={handleDownload} style={{ marginTop: 20 }}>
          <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>첨부파일 다운로드</Text>
        </TouchableOpacity>
      )}
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
