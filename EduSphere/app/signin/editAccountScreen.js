import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { useRouter } from "expo-router";
import EditAccountModal from './editAccountModal';
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import styles from '../../style/signinStyle/editAccountStyle'; // 스타일은 따로 관리하면 좋아

export default function EditAccountScreen() {
  const [modalVisible, setModalVisible] = useState(false); // 모달 상태
  const [nickname, setNickname] = useState('');
  const [school, setSchool] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

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
        setModalVisible(true);
      } else {
        Alert.alert('실패', response.data.message || '수정에 실패했습니다.');
      }
    } catch (err) {
      console.error(err);
      Alert.alert('오류', '서버 오류가 발생했습니다.');
    }
  };

  const handleBack = () => {
    router.push('/ProfileScreen')
  };

  // 모달 확인 버튼 처리
  const handleModalConfirm = () => {
    setModalVisible(false); // 모달 닫기
    router.push("/ProfileScreen"); // 다음 화면으로 이동
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 뒤로가기 버튼 */}
      <TouchableOpacity onPress={handleBack} style={styles.backIcon}>
        <Icon name="arrow-left" size={20} color="#fff" />
      </TouchableOpacity>

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

      {/* EditAccountModal 추가 */}
      <EditAccountModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)} // 모달 닫기
        onConfirm={handleModalConfirm} // 확인 버튼 처리
        onText="수정 완료" // 모달 메시지
      />
    </SafeAreaView>
  );
}
