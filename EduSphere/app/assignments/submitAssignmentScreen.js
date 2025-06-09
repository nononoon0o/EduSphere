import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Dropdown } from 'react-native-element-dropdown';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../style/assignments/submitAssignmentScreenStyle';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';

export default function SubmitAssignmentScreen() {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const { t } = useTranslation();

  const [assignments, setAssignments] = useState([]);
  const [assignmentFile, setAssignmentFile] = useState(null);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const fetchAssignments = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/assignments', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const assignmentList = res.data.map((a) => ({
        label: a.title,
        value: a._id,
      }));
      setAssignments(assignmentList);
    } catch (e) {
      Alert.alert(t('submit.error'), t('submit.fetchError'));
    }
  };

  useEffect(() => {
    fetchAssignments();
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

  const handleSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const formData = new FormData();
      formData.append('stuTitle', title);
      formData.append('stuContent', content);
      if (assignmentFile) {
        formData.append('stufileUrl', assignmentFile);
      }
      await axios.post(
        `http://localhost:5000/api/assignments/${selectedAssignment}/submit`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Alert.alert(t('submit.success'), t('submit.successMessage'));
      setTitle('');
      setContent('');
      setSelectedAssignment(null);
      setAssignmentFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (e) {
      Alert.alert(t('submit.error'), t('submit.submitError'));
      console.log(e);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F3F4F6' }}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={20} color="#fff" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>{t('submit.title')}</Text>

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

          <TextInput
            style={styles.input}
            placeholder={t('submit.assignmentTitle')}
            value={title}
            onChangeText={setTitle}
          />

          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder={t('submit.content')}
            value={content}
            onChangeText={setContent}
            multiline
          />

          <input
            type="file"
            ref={fileInputRef}
            accept=".docx,.hwp"
            onChange={handleFileChange}
            style={{ marginVertical: 10 }}
          />

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>{t('submit.submit')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
