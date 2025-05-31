import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../style/signinStyle/withdrawelStyle';
import BackButton from '../../components/BackButton'; // ✅ Import du bouton

export default function WithdrawalScreen() {
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleWithdrawal = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      const response = await axios.delete('http://localhost:5000/user/delete', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: { password },
        withCredentials: true,
      });

      if (response.status === 200) {
        await AsyncStorage.removeItem('token');
        router.replace('../signin/loginScreen');
      }
    } catch (error) {
      Alert.alert('오류', error.response?.data?.message || '탈퇴 처리 중 오류 발생');
    }
  };

  return (
    <View style={styles.container}>
      {/* ✅ Utilisation du composant BackButton */}
      <BackButton onPress={() => router.push('/ProfileScreen')} />

      {/* Center Card */}
      <View style={styles.card}>
        <Text style={styles.title}>회원 탈퇴</Text>
        <Text style={styles.infoText}>
          정말 탈퇴하시겠습니까?{'\n'}비밀번호를 입력해 주세요.
        </Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="비밀번호"
            placeholderTextColor="#888"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleWithdrawal}>
          <Text style={styles.buttonText}>탈퇴하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
