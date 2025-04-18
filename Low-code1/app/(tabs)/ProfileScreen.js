import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import styles from '../../style/LoginScreen';

export default function ProfileScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState(null);
  const router = useRouter();

  // 유저 정보 불러오기
  useEffect(() => {
    const fetchUserInfo = async () => {
      setIsLoading(true);
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          setUserName(null);
        } else {
          // 서버에서 유저 이름 불러오기
          const response = await axios.get('http://localhost:5000/user/name', {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            withCredentials: true,
          });
          console.log("서버 응답 데이터:", response.data); // 응답 데이터 확인
          if (response.data && response.data.nickname) {
            setUserName(response.data.nickname);
          } else {
            setUserName(null);
          }
        }
      } catch (error) {
        setUserName(null);
        // 에러 처리 (예: 토큰 만료 등)
      } finally {
        setIsLoading(false);
      }
    };
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
          {userName ? `${userName}님 어서오세요` : '로그인 해주세요'}
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
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>계정 설정</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>알림 설정</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>다크 모드</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
