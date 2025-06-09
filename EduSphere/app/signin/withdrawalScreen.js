import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../style/signinStyle/withdrawelStyle';
import BackButton from '../../components/BackButton';
import { useTranslation } from 'react-i18next';

export default function WithdrawalScreen() {
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const { t } = useTranslation();

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
        router.replace('/signin/loginScreen');
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || t('withdrawal.genericError'));
    }
  };

  return (
    <View style={styles.container}>
      <BackButton onPress={() => router.push('/ProfileScreen')} />

      <View style={styles.card}>
        <Text style={styles.title}>{t('withdrawal.title')}</Text>
        <Text style={styles.infoText}>{t('withdrawal.description')}</Text>

        {errorMessage !== "" && (
          <Text style={{ color: "red", marginBottom: 10, textAlign: 'center', fontWeight: "bold" }}>
            {errorMessage}
          </Text>
        )}

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={t('withdrawal.placeholder')}
            placeholderTextColor="#888"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleWithdrawal}>
          <Text style={styles.buttonText}>{t('withdrawal.submit')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
