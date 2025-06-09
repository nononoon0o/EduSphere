import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import BackButton from '../../components/BackButton';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../../style/signinStyle/verifyPasswordStyle';
import { useTranslation } from 'react-i18next';

export default function VerifyPasswordScreen() {
  const { t } = useTranslation();
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleBack = () => {
    router.push('/ProfileScreen');
  };

  const handleVerify = async () => {
    if (!password) {
      setErrorMessage(t('verifyPassword.errorEmpty'));
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
      }
    } catch (err) {
      console.log(err)
      if (err.response.status === 401) {
        setErrorMessage(t('verifyPassword.errorMismatch'));
      } else {
        setErrorMessage(t('verifyPassword.errorServer'));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackButton onPress={handleBack} />

      <View style={styles.card}>
        <Text style={styles.title}>{t('verifyPassword.title')}</Text>
        <Text style={styles.subtitle}>{t('verifyPassword.subtitle')}</Text>
        {errorMessage !== "" && (
          <Text style={{ color: "red", marginBottom: 10, textAlign: 'center', fontWeight: "bold" }}>
            {errorMessage}
          </Text>
        )}

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={t('verifyPassword.placeholder')}
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
            <Text style={styles.buttonText}>
              {t('verifyPassword.confirmButton')}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
