import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import styles from '../../style/signinStyle/loginStyle';

export default function ProfileScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState(null);
  const [role, setRole] = useState(null);
  const router = useRouter();
  const [userID, setUserID] = useState(""); // 아이디 상태
  const [password, setPassword] = useState(""); // 비밀번호 상태
  const [passwordVisible, setPasswordVisible] = useState(false); // 비밀번호 가시성 상태
  const [errorMessage, setErrorMessage] = useState("");

  // 로그인 요청 처리 함수
  const handleLogin = async () => {
    try {
      const loginData = {
        userID: userID.trim(),
        password: password.trim(),
      };

      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        loginData
      );

      if (response.data.success) {
        // JWT 토큰 저장
        const token = response.data.token;
        await AsyncStorage.setItem("token", token); // AsyncStorage에 저장
        setErrorMessage("");
        Alert.alert("로그인 성공", "홈 화면으로 이동합니다.");
        router.push("MenuScreen"); // 홈 화면으로 이동
      } else {
        // 서버에서 오는 메시지에 따라 에러 메시지 설정
        if (response.data.message === "비밀번호가 일치하지 않습니다.") {
          setErrorMessage("비밀번호가 일치하지 않습니다.");
        } else if (response.data.message === "존재하지 않는 사용자입니다.") {
          setErrorMessage("존재하지 않는 사용자입니다.");
        } else {
          setErrorMessage(response.data.message || "로그인에 실패했습니다.");
        }
      }
    } catch (error) {
      Alert.alert("오류", "서버와의 통신 중 문제가 발생했습니다.");
      console.error(error);
    }
  };

  // 회원가입 화면으로 이동하는 함수
  const handleAccount = () => {
    router.push("/signup/signmail"); // 테스트용 경로
  };

  const handleIdfind = () => {
    router.push("/find/findmain");
  };

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
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        setUserName(null);
        setRole(null);
      } else {
        // 1. 닉네임 가져오기
        const nameRes = await axios.get('http://localhost:5000/user/name', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          withCredentials: true,
        });
  
        if (nameRes.data?.nickname) {
          setUserName(nameRes.data.nickname);
        }
  
        // 2. 역할 가져오기
        const roleRes = await axios.get('http://localhost:5000/user/role', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          withCredentials: true,
        });
  
        if (roleRes.data?.role) {
          setRole(roleRes.data.role);
        }
      }
    } catch (error) {
      setUserName(null);
      setRole(null);
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
              onPress={() => {router.push('')}}
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
