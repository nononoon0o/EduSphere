import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function SubmitAssignmentScreen() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null); // 파일 업로드가 필요하다면

  const handleSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      // 파일 업로드가 필요 없다면 아래처럼 간단하게
      await axios.post(
        'http://localhost:5000/api/assignments/submit',
        {
          title,
          content,
          // file: file, // 파일 업로드는 별도 처리
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
