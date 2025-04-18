import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import styles from '../../style/LoginScreen';

export default function ProfileScreen() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const userName = "홍길동";

  return (
    <SafeAreaView style={styles.container}>
      {/* 상단 프로필/로그인 영역 */}
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 40,
        width: '80%',
        justifyContent: 'center',
      }}>
        <Text style={styles.loginButtonText}>
          {isLoggedIn ? `${userName}님` : '로그인 해주세요'}
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
            if (isLoggedIn) {
              setIsLoggedIn(false);
            } else {
              navigation.navigate('../signin/loginScreen');
            }
          }}
        >
          <Text style={styles.loginButtonText}>
            {isLoggedIn ? '로그아웃' : '로그인'}
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
