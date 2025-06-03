import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Dropdown } from 'react-native-element-dropdown';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import styles from '../../style/assignments/submitAssignmentScreenStyle';

export default function SubmitAssignmentScreen() {
  const navigation = useNavigation();

  const [assignments, setAssignments] = useState([]);
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
      Alert.alert('오류', '과제 목록을 불러오지 못했습니다.');
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const handleSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      await axios.post(
        'http://localhost:5000/api/assignments/submit',
        {
          assignmentId: selectedAssignment,
          title,
          content,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      Alert.alert('성공', '과제가 제출되었습니다!');
      setTitle('');
      setContent('');
      setSelectedAssignment(null);
    } catch (e) {
      Alert.alert('오류', '과제 제출에 실패했습니다.');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F3F4F6' }}> {/* ✅ Unified Background */}
      {/* ✅ Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={20} color="#fff" />
      </TouchableOpacity>

      {/* ✅ Scrollable content */}
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>과제 제출</Text>

          <Dropdown
            style={styles.dropdown}
            data={assignments}
            labelField="label"
            valueField="value"
            placeholder="제출할 과제를 선택하세요"
            value={selectedAssignment}
            onChange={(item) => setSelectedAssignment(item.value)}
            maxHeight={300}
          />

          <TextInput
            style={styles.input}
            placeholder="과제 제목"
            value={title}
            onChangeText={setTitle}
          />

          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="내용"
            value={content}
            onChangeText={setContent}
            multiline
          />

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>제출하기</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
