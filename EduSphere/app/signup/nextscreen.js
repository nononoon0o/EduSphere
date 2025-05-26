import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../../style/signupStyle/NumberScreen';

const NextScreen = () => {
  const router = useRouter();

  // Redirect automatically after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/signin/loginScreen');
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleNavigate = () => {
    router.push('/signin/loginScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Icon name="check-circle" size={64} color="#10B981" style={styles.icon} />
        <Text style={styles.title}>환영합니다!</Text>
        <Text style={styles.subtitle}>회원가입이 완료되었습니다.</Text>
        <TouchableOpacity style={styles.button} onPress={handleNavigate}>
          <Text style={styles.buttonText}>로그인 화면으로 이동</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NextScreen;
