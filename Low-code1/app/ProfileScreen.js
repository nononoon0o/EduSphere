// app/ProfileScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.headerWrapper}>
        <Ionicons name="person-circle-outline" size={60} color="#fff" />
        <Text style={styles.title}>로그인</Text>
      </View>

      <View style={styles.inputWrapper}>
        <View style={styles.inputField}>
          <FontAwesome name="user" size={18} color="#ccc" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="아이디"
            placeholderTextColor="#aaa"
            value={username}
            onChangeText={setUsername}
          />
        </View>

        <View style={styles.inputField}>
          <FontAwesome name="lock" size={18} color="#ccc" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="비밀번호"
            placeholderTextColor="#aaa"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? 'eye' : 'eye-off'}
              size={20}
              color="#888"
            />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginText}>로그인</Text>
      </TouchableOpacity>

      <View style={styles.linkRow}>
        <TouchableOpacity onPress={() => router.push('/find/findmain')}>
          <Text style={styles.linkText}>아이디찾기</Text>
        </TouchableOpacity>
        <Text style={styles.separator}>|</Text>
        <TouchableOpacity onPress={() => router.push('/find/FindPassword')}>
          <Text style={styles.linkText}>비밀번호찾기</Text>
        </TouchableOpacity>
        <Text style={styles.separator}>|</Text>
        <TouchableOpacity onPress={() => router.push('/signup/idScreen')}>
          <Text style={styles.linkText}>회원가입</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d1117',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  headerWrapper: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  inputWrapper: {
    gap: 15,
    marginBottom: 30,
  },
  inputField: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1f2937',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  linkRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  linkText: {
    color: '#60a5fa',
    fontSize: 14,
  },
  separator: {
    color: '#ccc',
    marginHorizontal: 4,
  },
});
