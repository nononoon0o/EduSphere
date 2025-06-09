import React, { useState } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  View
} from 'react-native';
import { useRouter } from "expo-router";
import EditAccountModal from './editAccountModal';
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import styles from '../../style/signinStyle/editAccountStyle';
import BackButton from '../../components/BackButton';
import { useTranslation } from 'react-i18next';

export default function EditAccountScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [nickname, setNickname] = useState('');
  const [school, setSchool] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const { t } = useTranslation();

  const isValidNickname = nickname.length >= 2;
  const isValidSchool = school.length >= 2;
  const isValidPassword = password.length >= 6;

  const handleSave = async () => {
    if (!isValidNickname || !isValidSchool || !isValidPassword) {
      setErrorMessage(t('edit.errorInput'));
      return;
    }
    setErrorMessage("");

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
        setErrorMessage(response.data.message || t('edit.failMessage'));
      }
    } catch (err) {
      console.error(err);
      setErrorMessage(t('edit.serverError'));
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
        <Text style={styles.title}>{t('edit.title')}</Text>

        {errorMessage !== "" && (
          <Text style={{ color: "red", marginBottom: 10, textAlign: 'center', fontWeight: "bold" }}>
            {errorMessage}
          </Text>
        )}

        {/* Nickname */}
        <View style={styles.inputWrapper}>
          <Icon name="user" size={18} color="#9CA3AF" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder={t('edit.nicknamePlaceholder')}
            placeholderTextColor="#9CA3AF"
            value={nickname}
            onChangeText={setNickname}
          />
        </View>

        {/* School */}
        <View style={styles.inputWrapper}>
          <Icon name="building" size={18} color="#9CA3AF" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder={t('edit.schoolPlaceholder')}
            placeholderTextColor="#9CA3AF"
            value={school}
            onChangeText={setSchool}
          />
        </View>

        {/* Password */}
        <View style={styles.inputWrapper}>
          <Icon name="lock" size={18} color="#9CA3AF" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder={t('edit.passwordPlaceholder')}
            placeholderTextColor="#9CA3AF"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>{t('edit.saveButton')}</Text>
        </TouchableOpacity>
      </View>

      <EditAccountModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={handleModalConfirm}
        onText={t('edit.modalText')}
      />
    </SafeAreaView>
  );
}
