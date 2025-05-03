import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import profileStyles from '../../style/profileStyles';
import styles from '../../style/signinStyle/loginStyle';


export default function ProfileScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState(null);
  const [role, setRole] = useState(null);

  const getRoleName = (role) => {
    switch (role) {
      case 'student': return t('studentMenu');
      case 'teacher': return t('teacherMenu');
      default: return '';
    }
  };

  const fetchUserInfo = async () => {
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        setUserName(null);
        setRole(null);
      } else {
        const [nameRes, roleRes] = await Promise.all([
          axios.get('http://localhost:5000/user/name', {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }),
          axios.get('http://localhost:5000/user/role', {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }),
        ]);

        if (nameRes.data?.nickname) setUserName(nameRes.data.nickname);
        if (roleRes.data?.role) setRole(roleRes.data.role);
      }
    } catch (error) {
      setUserName(null);
      setRole(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const handleLogout = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        await axios.post(
          'http://localhost:5000/api/auth/logout',
          {},
          { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
        );
        await AsyncStorage.removeItem('token');
      }
      setUserName(null);
      setRole(null);
    } catch (e) {
      console.log('Logout error', e);
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={profileStyles.container}>
        <ActivityIndicator size="large" color="#0097FB" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={profileStyles.container}>
      <View style={profileStyles.greetingContainer}>
        <Text style={profileStyles.greetingText}>
          {userName
            ? t('greeting', { role: getRoleName(role), name: userName })
            : t('pleaseLogin')}
        </Text>
        <TouchableOpacity
          style={profileStyles.loginLogoutButton}
          onPress={userName ? handleLogout : () => router.push('../signin/loginScreen')}
        >
          <Text style={profileStyles.loginLogoutButtonText}>
            {userName ? t('logout') : t('login')}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={profileStyles.sectionContainer}>
        {userName && (
          <>
            {/* Always show these for logged-in users */}
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => router.push('../signin/verifyPasswordScreen')}
            >
              <Text style={styles.loginButtonText}>{t('editProfile')}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => router.push('../signin/withdrawalScreen')}
            >
              <Text style={styles.loginButtonText}>{t('deleteAccount')}</Text>
            </TouchableOpacity>
          </>
        )}

        {role === 'teacher' && (
          <>
            <Text style={profileStyles.sectionTitle}>{t('teacherMenu')}</Text>
            <TouchableOpacity style={styles.loginButton}>
              <Text style={styles.loginButtonText}>{t('setCurriculum')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginButton}>
              <Text style={styles.loginButtonText}>{t('manageStudents')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginButton}>
              <Text style={styles.loginButtonText}>{t('viewResults')}</Text>
            </TouchableOpacity>
          </>
        )}

        {role === 'student' && (
          <>
            <Text style={profileStyles.sectionTitle}>{t('studentMenu')}</Text>
            <TouchableOpacity style={styles.loginButton}>
              <Text style={styles.loginButtonText}>{t('viewResults')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginButton}>
              <Text style={styles.loginButtonText}>{t('sendMessage')}</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}
