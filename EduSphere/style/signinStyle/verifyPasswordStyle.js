import React, { useState } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  View,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import styles from '../../style/signinStyle/verifyPasswordStyle';

export default function VerifyPasswordScreen() {
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleVerify = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/user/verifyPW',
        { password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        router.push('/signin/editAccountScreen');
      } else {
        Alert.alert('실패', '비밀번호가 일치하지 않습니다.');
      }
    } catch (err) {
      console.error(err);
      Alert.alert('오류', '서버 오류가 발생했습니다.');
    }
  };

  const handleBack = () => {
    router.push('/ProfileScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={handleBack} style={styles.backIcon}>
        <Icon name="arrow-left" size={24} color="#fff" />
      </TouchableOpacity>

      {/* Large Center Card */}
      <View style={styles.card}>
        <Text style={styles.title}>비밀번호 확인</Text>
        <Text style={styles.subtitle}>계정 수정을 위해 비밀번호를 입력해주세요.</Text>

        <TextInput
          style={styles.input}
          placeholder="비밀번호 입력"
          placeholderTextColor="#9CA3AF"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleVerify}>
          <Text style={styles.buttonText}>확인</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
