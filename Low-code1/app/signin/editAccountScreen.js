import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import axios from 'axios';
import styles from '../../style/editAccountStyle'; // 스타일은 따로 관리하면 좋아

export default function EditAccountScreen() {
  const [nickname, setNickname] = useState('');
  const [school, setSchool] = useState('');
  const [password, setPassword] = useState('');

  const handleSave = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      const response = await axios.post(
        'http://localhost:5000/user/account/edit',
        { nickname, school, password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      );

      if (response.data.success) {
        Alert.alert('성공', '계정 정보가 수정되었습니다.');
      } else {
        Alert.alert('실패', response.data.message || '수정에 실패했습니다.');
      }
    } catch (err) {
      console.error(err);
      Alert.alert('오류', '서버 오류가 발생했습니다.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>계정 정보 수정</Text>

      <TextInput
        style={styles.input}
        placeholder="닉네임"
        value={nickname}
        onChangeText={setNickname}
      />
      <TextInput
        style={styles.input}
        placeholder="학교명"
        value={school}
        onChangeText={setSchool}
      />
      <TextInput
        style={styles.input}
        placeholder="새 비밀번호"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>저장</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
