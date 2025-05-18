import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, ActivityIndicator, StyleSheet, ScrollView, TouchableOpacity, Platform, Alert } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

let WebDatePicker = null;
if (Platform.OS === 'web') {
  WebDatePicker = require('react-datepicker').default;
  require('react-datepicker/dist/react-datepicker.css');
}

const rawChapters = [
  { chapter: 'Chapter1_01', title: '1과 영상' },
  { chapter: 'Chapter1_02', title: '1과 퀴즈' },
];

const chapterList = rawChapters.map(c => ({
  label: c.title,
  value: c.chapter
}));

const TeacherDashboard = ({ navigation }) => {
  const [assignments, setAssignments] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    description: '',
    dueDate: ''
  });
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
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

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('ko-KR');
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

  const fetchDeadline = async () => {
     try {
        const res = await axios.get('http://localhost:5000/api/deadlines');
        const deadlineObj = {};
        res.data.deadlines.forEach(d => {
          deadlineObj[d.chapter] = d.deadline;
        });
        setDeadlines(deadlineObj);
      } catch (e) {
        
      }
  }

  useEffect(() => {
    console.log("Dropdown data:", chapterList);
    console.log("Dropdown value:", selectedChapter);
    const fetchData = async () => {
      await fetchAssignments();
      await fetchAttendance();
      await fetchDeadline();
    };
    fetchData();
  }, []);

  // 새 과제 생성
  const handleCreateAssignment = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const payload = {
        ...newAssignment,
        dueDate: new Date(newAssignment.dueDate).toISOString()
      };
      const res = await axios.post('http://localhost:5000/api/assignments', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setAssignments([...assignments, res.data.assignment]);
      setNewAssignment({ title: '', description: '', dueDate: '' });
      setError('');
    } catch (err) {
      setError('과제 생성 실패');
    }
  };

  // 과제 삭제
  const handleDeleteAssignment = async (id) => {
    try {
      const token = await AsyncStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/assignments/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAssignments(assignments.filter(assignment => assignment._id !== id));
    } catch (err) {
      setError('과제 삭제 실패');
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
      fetchAttendance();
    } catch (err) {
      setError('출결 기록 저장 실패');
    }
  };

  const handleSaveDeadline = async () => {
    if (!selectedChapter || !selectedDate) {
      Alert.alert('오류', '챕터와 데드라인을 모두 선택하세요.');
      return;
    }
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');
      await axios.post(
        'http://localhost:5000/api/deadlines',
        {
          chapter: selectedChapter,
          deadline: dayjs(selectedDate).toISOString()
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      Alert.alert('성공', '데드라인이 저장되었습니다.');
    } catch (e) {
      Alert.alert('오류', '데드라인 저장에 실패했습니다.');
    } finally {
      setLoading(false);
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
          onChangeText={t => setNewAssignment({ ...newAssignment, title: t })}
        />
        <TextInput
          style={styles.input}
          placeholder="설명"
          value={newAssignment.description}
          onChangeText={t => setNewAssignment({ ...newAssignment, description: t })}
        />
        <TextInput
          style={styles.input}
          placeholder="마감일 (YYYY-MM-DD)"
          value={newAssignment.dueDate}
          onChangeText={t => setNewAssignment({ ...newAssignment, dueDate: t })}
        />
        <TouchableOpacity style={styles.appButtonContainer} onPress={handleCreateAssignment}>
          <Text style={styles.appButtonText}>과제 생성</Text>
        </TouchableOpacity>
      </View>

      {/* 기존 과제 목록 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>현재 과제 목록</Text>
        <FlatList
          data={assignments}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <View style={styles.assignmentRow}>
              <View style={styles.assignmentInfo}>
                <Text style={styles.itemTitle}>
                  {item.title} || {item.description} || {formatDate(item.dueDate)}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.deleteButtonWrapper}
                onPress={() => handleDeleteAssignment(item._id)}
              >
                <Text style={styles.deleteButtonText}>삭제</Text>
              </TouchableOpacity>
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
                <TouchableOpacity
                  style={[styles.appButtonContainer, styles.attendanceBtn, { backgroundColor: 'green' }]}
                  onPress={() => saveAttendance(item.studentId, 'present')}
                >
                  <Text style={styles.appButtonText}>출석</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.appButtonContainer, styles.attendanceBtn, { backgroundColor: 'red' }]}
                  onPress={() => saveAttendance(item.studentId, 'absent')}
                >
                  <Text style={styles.appButtonText}>결석</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>

      {/* 챕터별 데드라인 설정 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>챕터별 데드라인 설정</Text>
        {chapterList.length > 0 && (
          <Dropdown
            style={styles.dropdown}
            data={chapterList}
            labelField="label"
            valueField="value"
            placeholder="챕터를 선택하세요"
            value={selectedChapter}
            onChange={item => setSelectedChapter(item.value)}
          />
        )}
        <WebDatePicker
          selected={selectedDate}
          onChange={date => setSelectedDate(date)}
          showTimeSelect
          timeIntervals={10}
          timeFormat="HH:mm" 
          dateFormat="yyyy-MM-dd HH:mm"
          placeholderText="날짜를 선택하세요"
          popperPlacement="bottom-start"
          className="react-datepicker__input"
          style={{ width: '100%', height: 40, fontSize: 16 }}
        />
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSaveDeadline}
        >
          <Text style={{ fontWeight: 'bold' }}>데드라인 저장</Text>
        </TouchableOpacity>
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
  deleteButtonWrapper: {
    marginLeft: 10,
    backgroundColor: '#00A8FF',
    borderRadius: 5,
    height: 35,
    minWidth: 60,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  appButtonContainer: {
    backgroundColor: '#00A8FF',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 10,
  },
  appButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
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
  attendanceBtn: {
    marginHorizontal: 3,
    paddingVertical: 7,
    paddingHorizontal: 12,
    minWidth: 60,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default TeacherDashboard;
