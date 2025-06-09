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
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

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
    return date.toLocaleDateString();
  };

  const fetchAssignments = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/assignments', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAssignments(res.data);
    } catch (err) {
      setError(t('dashboard.errorLoadingAssignments'));
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
      Alert.alert(t('dashboard.fileTypeAlert'));
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
      setError(t('dashboard.errorCreateAssignment'));
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
      setError(t('dashboard.errorDeleteAssignment'));
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
      Alert.alert(t('dashboard.deadlineSaved'));
    } catch (e) {
      Alert.alert(t('dashboard.deadlineSaveError'));
      console.log(e);
    }
  };

  if (loading) return <ActivityIndicator size="large" />;

  return (
    <ScrollView>
      <TouchableOpacity style={styles.floatingBackButton} onPress={() => router.replace('/stuManage/stuManageScreen')}>
        <Ionicons name="arrow-back" size={20} color="#fff" />
      </TouchableOpacity>

      <ScrollView style={styles.container}>
        {/* Assignment Creation */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('dashboard.createAssignment')}</Text>
          <TextInput
            style={styles.input}
            placeholder={t('dashboard.assignmentTitle')}
            value={newAssignment.title}
            onChangeText={t => setNewAssignment({ ...newAssignment, title: t })}
          />
          <TextInput
            style={styles.input}
            placeholder={t('dashboard.assignmentDescription')}
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
            placeholderText={t('dashboard.selectDate')}
            className="react-datepicker__input"
            portalId="root-portal"
          />
          <input
            type="file"
            ref={fileInputRef}
            accept=".docx,.hwp"
            onChange={handleFileChange}
            style={{ marginVertical: 10 }}
          />
          {assignmentFile && <Text>{t('dashboard.selectedFile')}: {assignmentFile.name}</Text>}
          <TouchableOpacity style={styles.appButtonContainer} onPress={handleCreateAssignment}>
            <Text style={styles.appButtonText}>{t('dashboard.create')}</Text>
          </TouchableOpacity>
        </View>

        {/* Assignment List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('dashboard.currentAssignments')}</Text>
          <FlatList
            data={assignments}
            keyExtractor={item => item._id}
            renderItem={({ item }) => (
              <View style={styles.assignmentRow}>
                <View style={styles.assignmentInfo}>
                  <Text style={styles.itemTitle}>
                    {item.title} | {item.description} | {formatDate(item.dueDate)}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.detailButtonWrapper}
                  onPress={() => router.push(`/assignments/${item._id}`)}
                >
                  <Text style={styles.deleteButtonText}>{t('result.viewDetails')}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButtonWrapper}
                  onPress={() => handleDeleteAssignment(item._id)}
                >
                  <Text style={styles.deleteButtonText}>{t('dashboard.delete')}</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>

        {/* Deadline Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('dashboard.setChapterDeadline')}</Text>
          <Dropdown
            style={styles.dropdown}
            data={chapterList}
            labelField="label"
            valueField="value"
            placeholder={t('dashboard.selectChapter')}
            value={selectedChapter}
            onChange={item => setSelectedChapter(item.value)}
          />
          <WebDatePicker
            selected={selectedDate}
            onChange={date => setSelectedDate(date)}
            showTimeSelect
            timeIntervals={10}
            timeFormat="HH:mm"
            dateFormat="yyyy-MM-dd HH:mm"
            placeholderText={t('dashboard.selectDate')}
            className="react-datepicker__input"
          />
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveDeadline}>
            <Text style={styles.appButtonText}>{t('dashboard.saveDeadline')}</Text>
          </TouchableOpacity>
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('dashboard.weightSetting')}</Text>
          <TouchableOpacity
            style={styles.weightButtonContainer}
            onPress={() => router.push('./teacherDashboard/weight')}
          >
            <Text style={styles.appButtonText}>{t('dashboard.weightSetting')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScrollView>
  );
};

export default TeacherDashboard;
