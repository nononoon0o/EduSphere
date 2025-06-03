import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import BackButton from '../../components/BackButton';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../../style/signinStyle/verifyPasswordStyle';

export default function VerifyPasswordScreen() {
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();

  const handleBack = () => {
    router.push('/ProfileScreen');
  };

  const handleVerify = async () => {
    if (!password) {
      Alert.alert('오류', '비밀번호를 입력해주세요.');
      return;
    }

    setIsSubmitting(true);

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
      Alert.alert('오류', '서버 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackButton onPress={handleBack} />

      <View style={styles.card}>
        <Text style={styles.title}>비밀번호 확인</Text>
        <Text style={styles.subtitle}>계정 수정을 위해 비밀번호를 입력해주세요.</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="비밀번호 입력"
            placeholderTextColor="#9CA3AF"
            secureTextEntry={!passwordVisible}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)}
            style={styles.eyeIcon}
          >
            <Icon
              name={passwordVisible ? 'eye-slash' : 'eye'}
              size={20}
              color="#6B7280"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleVerify}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>확인</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
