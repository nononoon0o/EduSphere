import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TeacherDashboard = ({ navigation }) => {
  const [assignments, setAssignments] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    description: '',
    dueDate: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  // 출결 기록 불러오기
  const fetchAttendance = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/attendance', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAttendance(res.data);
    } catch (err) {
      setError('출결 기록을 불러올 수 없습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchAssignments();
      await fetchAttendance();
    };
    fetchData();
  }, []);

  // 새 과제 생성
  const handleCreateAssignment = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await axios.post('http://localhost:5000/api/assignments', newAssignment, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAssignments([...assignments, res.data]);
      setNewAssignment({ title: '', description: '', dueDate: '' });
    } catch (err) {
      setError('과제 생성 실패');
    }
  };

  // 출결 기록 저장
  const saveAttendance = async (studentId, status) => {
    try {
      const token = await AsyncStorage.getItem('token');
      await axios.post('http://localhost:5000/api/attendance', {
        studentId,
        status,
        date: new Date().toISOString()
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchAttendance(); // 출결 기록 갱신
    } catch (err) {
      setError('출결 기록 저장 실패');
    }
  };

  if (loading) return <ActivityIndicator size="large" />;

  return (
    <ScrollView style={styles.container}>
      {/* 과제 생성 섹션 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>새 과제 생성</Text>
        <TextInput
          style={styles.input}
          placeholder="과제명"
          value={newAssignment.title}
          onChangeText={t => setNewAssignment({...newAssignment, title: t})}
        />
        <TextInput
          style={styles.input}
          placeholder="설명"
          value={newAssignment.description}
          onChangeText={t => setNewAssignment({...newAssignment, description: t})}
        />
        <TextInput
          style={styles.input}
          placeholder="마감일 (YYYY-MM-DD)"
          value={newAssignment.dueDate}
          onChangeText={t => setNewAssignment({...newAssignment, dueDate: t})}
        />
        <Button title="과제 생성" onPress={handleCreateAssignment} />
      </View>

      {/* 기존 과제 목록 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>현재 과제 목록</Text>
        <FlatList
          data={assignments}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text>마감일: {item.dueDate}</Text>
              <Text>제출자 수: {item.submissions?.length || 0}</Text>
            </View>
          )}
        />
      </View>

      {/* 출결 관리 섹션 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>오늘의 출결 관리</Text>
        <FlatList
          data={attendance}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <View style={styles.attendanceItem}>
              <Text>{item.studentId}</Text>
              <View style={styles.attendanceButtons}>
                <Button 
                  title="출석" 
                  color="green" 
                  onPress={() => saveAttendance(item.studentId, 'present')}
                />
                <Button
                  title="결석"
                  color="red"
                  onPress={() => saveAttendance(item.studentId, 'absent')}
                />
              </View>
            </View>
          )}
        />
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  section: {
    marginBottom: 30,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  attendanceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  attendanceButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default TeacherDashboard;
