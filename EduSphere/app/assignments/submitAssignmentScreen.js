import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Dropdown } from 'react-native-element-dropdown';

export default function SubmitAssignmentScreen() {
  const [assignments, setAssignments] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);

  const fetchAssignments = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/assignments', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const assignmentList = res.data.map(a => ({
        label: a.title,
        value: a._id
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
          title,
          content,
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      Alert.alert('성공', '과제가 제출되었습니다!');
      setTitle('');
      setContent('');
    } catch (e) {
      Alert.alert('오류', '과제 제출에 실패했습니다.');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 20 }}>과제 제출</Text>
      <Dropdown
        style={styles.dropdown}
        data={assignments}
        labelField="label"
        valueField="value"
        placeholder="제출할 과제를 선택하세요"
        value={selectedAssignment}
        onChange={item => setSelectedAssignment(item.value)}
        maxHeight={300}
      />
      <TextInput
        style={{ borderWidth: 1, marginBottom: 12, padding: 8 }}
        placeholder="과제 제목"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={{ borderWidth: 1, marginBottom: 12, padding: 8, height: 120, textAlignVertical: 'top' }}
        placeholder="내용"
        value={content}
        onChangeText={setContent}
        multiline
      />
      {/* 파일 업로드는 필요시 구현 */}
      <TouchableOpacity
        style={{ backgroundColor: '#4caf50', padding: 14, borderRadius: 8, alignItems: 'center' }}
        onPress={handleSubmit}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>제출하기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
});