import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { useRouter } from "expo-router";
import { fetchUserInfoAll } from '../service/userService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import styles from '../../style/signinStyle/loginStyle';

export default function ProfileScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState(null);
  const [role, setRole] = useState(null);
  const router = useRouter();
  const [mongoID, setMongoID] = useState("")
  const [errorMessage, setErrorMessage] = useState("");

  const getRoleName = (role) => {
    switch (role) {
      case "student":
        return "학생";
      case "teacher":
        return "교사";
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
  
  // 유저 정보 불러오기
  useEffect(() => {
    fetchUserInfo();
  }, []);

  // 로그아웃
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
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 40,
          width: '80%',
          justifyContent: 'center',
        }}
      >
        <Text style={styles.loginButtonText}>
          {userName ? `${getRoleName(role)} ${userName}님 어서오세요` : '로그인 해주세요'}
        </Text>
        <TouchableOpacity
          style={{
            marginLeft: 16,
            height: 40,
            paddingHorizontal: 18,
            backgroundColor: '#0053a6',
            borderRadius: 5,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            if (userName) {
              handleLogout();
            } else {
              router.push('../signin/loginScreen');
            }
          }}
        >
          <Text style={styles.loginButtonText}>
            {userName ? '로그아웃' : '로그인'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* 설정 버튼 영역 */}
      <View style={{ width: '80%', alignItems: 'center' }}>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => {
            if(!userName) {
              console.log("오류")
            } else {
              router.push('../signin/verifyPasswordScreen');
            }
          }}
        >
          <Text style={styles.loginButtonText}>계정 정보 수정</Text>
        </TouchableOpacity>

        {/* 교사 전용 버튼 */}
        {role === "teacher" && (
          <>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => {router.push('')}}
            >
              <Text style={styles.loginButtonText}>진도 설정</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => {router.push('../stuManage/stuManageScreen')}}
            >
              <Text style={styles.loginButtonText}>학생 관리</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => {router.push('')}}
            >
              <Text style={styles.loginButtonText}>학습 결과 확인</Text>
            </TouchableOpacity>
          </>
        )}

        {/* 학생 전용 버튼 */}
        {role === "student" && (
          <>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => {router.push({
                pathname: '/stuManage/stuResult/stuResultScreen',
                params: { studentId: mongoID } // 사용자 ID 전달
              })}}
            >
              <Text style={styles.loginButtonText}>학습 결과 확인</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => {router.push('')}}
            >
              <Text style={styles.loginButtonText}>쪽지 보내기</Text>
            </TouchableOpacity>
          </>
        )}

        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => {
            if(!userName) {
              console.log("오류")
            } else {
              router.push('../signin/withdrawalScreen');
            }
          }}
        >
          <Text style={styles.loginButtonText}>회원 탈퇴</Text>
        </TouchableOpacity>

        
      </View>
    </SafeAreaView>
  );
}
