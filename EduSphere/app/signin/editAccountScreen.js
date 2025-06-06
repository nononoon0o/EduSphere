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
import BackButton from '../../components/BackButton';
import { useTranslation } from 'react-i18next';

export default function EditAccountScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [nickname, setNickname] = useState('');
  const [school, setSchool] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { t } = useTranslation();

  const isValidNickname = nickname.length >= 2;
  const isValidSchool = school.length >= 2;
  const isValidPassword = password.length >= 6;

  const handleSave = async () => {
    if (!isValidNickname || !isValidSchool || !isValidPassword) {
      Alert.alert(t('edit.errorTitle'), t('edit.errorInput'));
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
        Alert.alert(t('edit.failTitle'), response.data.message || t('edit.failMessage'));
      }
    } catch (err) {
      console.error(err);
      Alert.alert(t('edit.errorTitle'), t('edit.serverError'));
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
          {nickname.length > 0 && (
            <Icon
              name={isValidNickname ? "check-circle" : "times-circle"}
              size={18}
              color={isValidNickname ? "#10B981" : "#EF4444"}
              style={styles.validationIcon}
            />
          )}
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
          {school.length > 0 && (
            <Icon
              name={isValidSchool ? "check-circle" : "times-circle"}
              size={18}
              color={isValidSchool ? "#10B981" : "#EF4444"}
              style={styles.validationIcon}
            />
          )}
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
          {password.length > 0 && (
            <Icon
              name={isValidPassword ? "check-circle" : "times-circle"}
              size={18}
              color={isValidPassword ? "#10B981" : "#EF4444"}
              style={styles.validationIcon}
            />
          )}
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
