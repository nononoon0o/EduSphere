import React, { useState } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  View
} from 'react-native';
import { useRouter } from "expo-router";
import EditAccountModal from './editAccountModal';
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import styles from '../../style/signinStyle/editAccountStyle';
import BackButton from '../../components/BackButton'; // ✅ Import reusable back button

export default function EditAccountScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [nickname, setNickname] = useState('');
  const [school, setSchool] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const isValidNickname = nickname.length >= 2;
  const isValidSchool = school.length >= 2;
  const isValidPassword = password.length >= 6;

  const handleSave = async () => {
    if (!isValidNickname || !isValidSchool || !isValidPassword) {
      Alert.alert("입력 오류", "모든 필드를 올바르게 입력해주세요.");
      return;
    }

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

  const handleBack = () => router.push('/ProfileScreen');
  const handleModalConfirm = () => {
    setModalVisible(false);
    router.push("/ProfileScreen");
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackButton onPress={handleBack} />

      <View style={styles.card}>
        {/* ✅ Title moved inside card */}
        <Text style={styles.title}>계정 정보 수정</Text>

        {/* 닉네임 */}
        <View style={styles.inputWrapper}>
          <Icon name="user" size={18} color="#9CA3AF" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="닉네임"
            placeholderTextColor="#9CA3AF"
            value={nickname}
            onChangeText={setNickname}
          />
          {nickname.length > 0 && (
            <Icon
              name={isValidNickname ? "check-circle" : "times-circle"}
              size={18}
              color={isValidNickname ? "#10B981" : "#EF4444"}
              style={styles.validationIcon}
            />
          )}
        </View>

        {/* 학교명 */}
        <View style={styles.inputWrapper}>
          <Icon name="building" size={18} color="#9CA3AF" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="학교명"
            placeholderTextColor="#9CA3AF"
            value={school}
            onChangeText={setSchool}
          />
          {school.length > 0 && (
            <Icon
              name={isValidSchool ? "check-circle" : "times-circle"}
              size={18}
              color={isValidSchool ? "#10B981" : "#EF4444"}
              style={styles.validationIcon}
            />
          )}
        </View>

        {/* 비밀번호 */}
        <View style={styles.inputWrapper}>
          <Icon name="lock" size={18} color="#9CA3AF" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="새 비밀번호"
            placeholderTextColor="#9CA3AF"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          {password.length > 0 && (
            <Icon
              name={isValidPassword ? "check-circle" : "times-circle"}
              size={18}
              color={isValidPassword ? "#10B981" : "#EF4444"}
              style={styles.validationIcon}
            />
          )}
        </View>

        {/* ✅ Save Button moved inside card */}
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>저장</Text>
        </TouchableOpacity>
      </View>

      <EditAccountModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={handleModalConfirm}
        onText="수정 완료"
      />
    </SafeAreaView>
  );
}
