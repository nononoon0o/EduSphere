import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { useRouter } from "expo-router";
import { fetchUserInfoAll } from '../../services/userService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import styles from '../../style/profileStyles';
import { useTranslation } from 'react-i18next';

export default function ProfileScreen() {
  const { t } = useTranslation(); // 다국어 번역 훅
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태
  const [userName, setUserName] = useState(null);   // 사용자 이름
  const [role, setRole] = useState(null);           // 사용자 역할 (student/teacher)
  const [mongoID, setMongoID] = useState("");       // MongoDB 사용자 ID
  const router = useRouter();                       // 페이지 이동을 위한 라우터

  // 역할을 번역된 이름으로 반환
  const getRoleName = (role) => {
    switch (role) {
      case "student":
        return t('profile.student');
      case "teacher":
        return t('profile.teacher');
      default:
        return "";
    }
  };

  // 사용자 정보 불러오기
  const fetchUserInfo = async () => {
    setIsLoading(true);
    try {
      const { nickname, role, mongoId } = await fetchUserInfoAll();
      setUserName(nickname);
      setRole(role);
      setMongoID(mongoId);
    } catch (error) {
      setUserName(null);
      setRole(null);
      setMongoID(null);
    } finally {
      setIsLoading(false);
    }
  };

  // 화면 진입 시 사용자 정보 가져오기
  useEffect(() => {
    fetchUserInfo();
  }, []);

  // 로그아웃 처리
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
    } catch (e) {}
    setUserName(null);
    setRole(null);
    setMongoID(null);
  };

  // 로딩 중 화면
  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#0097FB" />
      </SafeAreaView>
    );
  }

  // 메인 프로필 화면
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileCard}>
        {/* 인사 메시지 */}
        <Text style={styles.greetingText}>
          {userName
            ? `${getRoleName(role)} ${userName}${t('profile.welcome')}`
            : t('profile.pleaseLogin')}
        </Text>

        {/* 로그인 / 로그아웃 버튼 */}
        <TouchableOpacity
          style={[styles.authButton, userName ? styles.logoutButton : styles.loginButton]}
          onPress={() => {
            if (userName) {
              handleLogout();
            } else {
              router.push('/signin/loginScreen');
            }
          }}
        >
          <Text style={styles.authButtonText}>
            {userName ? t('profile.logout') : t('profile.login')}
          </Text>
        </TouchableOpacity>

        {/* 기능 버튼 영역 */}
        <View style={styles.actionsContainer}>
          {/* 계정 수정 버튼 */}
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => {
              if (userName) {
                router.push('/signin/verifyPasswordScreen');
              }
            }}
          >
            <Text style={styles.actionButtonText}>{t('profile.editAccount')}</Text>
          </TouchableOpacity>

          {/* 교사용 기능 */}
          {role === "teacher" && (
            <>
              {/* <TouchableOpacity style={styles.actionButton} onPress={() => {}}>
                <Text style={styles.actionButtonText}>{t('profile.setProgress')}</Text>
              </TouchableOpacity> */}
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => router.push('/stuManage/stuManageScreen')}
              >
                <Text style={styles.actionButtonText}>{t('profile.manageStudents')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => router.push('/assignments/assignmentScore')}
              >
                <Text style={styles.actionButtonText}>{t('profile.assignmentScore')}</Text>
              </TouchableOpacity>
            </>
          )}

          {/* 학생용 기능 */}
          {role === "student" && (
            <>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => {
                  router.push({
                    pathname: '/stuManage/stuResult/stuResultScreen',
                    params: { studentId: mongoID },
                  });
                }}
              >
                <Text style={styles.actionButtonText}>{t('profile.viewResults')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => {
                  router.push('/assignments/submitAssignmentScreen');
                }}
              >
                <Text style={styles.actionButtonText}>{t('profile.submitAssignment')}</Text>
              </TouchableOpacity>
            </>
          )}

          {/* 회원 탈퇴 버튼 */}
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => {
              if (userName) {
                router.push('/signin/withdrawalScreen');
              }
            }}
          >
            <Text style={styles.actionButtonText}>{t('profile.withdraw')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
