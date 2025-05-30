import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { useRouter } from "expo-router";
import { fetchUserInfoAll } from '../../services/userService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import styles from '../../style/profileStyles';

export default function ProfileScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState(null);
  const [role, setRole] = useState(null);
  const router = useRouter();
  const [mongoID, setMongoID] = useState("");

  const getRoleName = (role) => {
    switch (role) {
      case "student":
        return "학생";
      case "teacher":
        return "교사";
      default:
        return "";
    }
  };

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
    } catch (e) {}
    setUserName(null);
    setRole(null);
    setMongoID(null);
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#0097FB" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileCard}>
        <Text style={styles.greetingText}>
          {userName ? `${getRoleName(role)} ${userName}님 어서오세요` : '로그인 해주세요'}
        </Text>
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
            {userName ? '로그아웃' : '로그인'}
          </Text>
        </TouchableOpacity>

        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => {
              if (userName) {
                router.push('/signin/verifyPasswordScreen');
              }
            }}
          >
            <Text style={styles.actionButtonText}>계정 정보 수정</Text>
          </TouchableOpacity>

          {role === "teacher" && (
            <>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => {}}
              >
                <Text style={styles.actionButtonText}>진도 설정</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => { router.push('/stuManage/stuManageScreen'); }}
              >
                <Text style={styles.actionButtonText}>학생 관리</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => {}}
              >
                <Text style={styles.actionButtonText}>학습 결과 확인</Text>
              </TouchableOpacity>
            </>
          )}

          {role === "student" && (
            <>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => {
                  router.push({
                    pathname: '/stuManage/stuResult/stuResultScreen',
                    params: { studentId: mongoID }
                  });
                }}
              >
                <Text style={styles.actionButtonText}>학습 결과 확인</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => {
                  router.push('/assignments/submitAssignmentScreen');
                }}
              >
                <Text style={styles.actionButtonText}>과제 제출</Text>
              </TouchableOpacity>
            </>
          )}

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => {
              if (userName) {
                router.push('/signin/withdrawalScreen');
              }
            }}
          >
            <Text style={styles.actionButtonText}>회원 탈퇴</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
