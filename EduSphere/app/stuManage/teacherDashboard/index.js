import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../../style/stuManageStyle/teacherDashboardStyle';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

let WebDatePicker = null;
if (Platform.OS === 'web') {
  WebDatePicker = require('react-datepicker').default;
  require('react-datepicker/dist/react-datepicker.css');
}

const rawChapters = [
  { chapter: 'Chapter1_01', title: 'Chapter1_01' },
  { chapter: 'Chapter1_02', title: 'Chapter1_02' },
  { chapter: 'Chapter1_03', title: 'Chapter1_03' },
  { chapter: 'Chapter2_01', title: 'Chapter2_01' },
  { chapter: 'Chapter2_02', title: 'Chapter2_02' },
  { chapter: 'Chapter2_03', title: 'Chapter2_03' },
];

const chapterList = rawChapters.map(c => ({
  label: c.title,
  value: c.chapter
}));

const TeacherDashboard = () => {
  const router = useRouter();
  const fileInputRef = useRef(null);

  const [assignments, setAssignments] = useState([]);
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    description: '',
    dueDate: '',
    teafileUrl: '',
  });
  const [newAssignmentDate, setNewAssignmentDate] = useState(null);
  const [assignmentFile, setAssignmentFile] = useState(null);

  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const [deadlines, setDeadlines] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('ko-KR');
  };

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

  const fetchDeadline = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/deadlines');
      const deadlineObj = {};
      res.data.deadlines.forEach(d => {
        deadlineObj[d.chapter] = d.deadline;
      });
      setDeadlines(deadlineObj);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchAssignments();
      await fetchDeadline();
    };
    fetchData();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.name.endsWith('.docx') || file.name.endsWith('.hwp'))) {
      setAssignmentFile(file);
    } else {
      Alert.alert('docx 또는 hwp 파일만 업로드할 수 있습니다.');
      e.target.value = '';
      setAssignmentFile(null);
    }
  };

  const handleCreateAssignment = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const formData = new FormData();
      formData.append('title', newAssignment.title);
      formData.append('description', newAssignment.description);
      formData.append('dueDate', new Date(newAssignment.dueDate).toISOString());
      if (assignmentFile) {
        formData.append('teafileUrl', assignmentFile);
      }

      const res = await axios.post('http://localhost:5000/api/assignments', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAssignments([...assignments, res.data.assignment]);
      setNewAssignment({ title: '', description: '', dueDate: '' });
      setNewAssignmentDate(null);
      setAssignmentFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      setError('');
    } catch (err) {
      console.log(err);
      setError('과제 생성 실패');
    }
  };

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

  const handleSaveDeadline = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      await axios.post(
        'http://localhost:5000/api/deadlines',
        {
          chapter: selectedChapter,
          deadline: selectedDate ? selectedDate.toISOString() : null
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      console.log('데드라인 저장 완료');
    } catch (e) {
      console.log('데드라인 저장 실패', e);
    }
  };

  if (loading) return <ActivityIndicator size="large" />;

  return (
    <View>
      <TouchableOpacity style={styles.floatingBackButton} onPress={() => router.back()}>
      <Ionicons name="arrow-back" size={20} color="#fff" />
    </TouchableOpacity>
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
        <WebDatePicker
          selected={newAssignmentDate}
          onChange={date => {
            setNewAssignmentDate(date);
            setNewAssignment({ ...newAssignment, dueDate: date });
          }}
          showTimeSelect
          timeIntervals={10}
          timeFormat="HH:mm"
          dateFormat="yyyy-MM-dd HH:mm"
          placeholderText="날짜를 선택하세요"
          popperPlacement="bottom-start"
          className="react-datepicker__input"
          portalId="root-portal"
          style={{ width: '100%', height: 40, fontSize: 16 }}
        />
        <input
          type="file"
          ref={fileInputRef}
          accept=".docx,.hwp"
          onChange={handleFileChange}
          style={{ marginVertical: 10 }}
        />
        {assignmentFile && <Text>선택된 파일: {assignmentFile.name}</Text>}
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
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveDeadline}>
          <Text style={{ fontWeight: 'bold' }}>데드라인 저장</Text>
        </TouchableOpacity>
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}
    </ScrollView>
    </View>
  );
};

export default TeacherDashboard;
