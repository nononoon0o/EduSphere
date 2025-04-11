
// app/auth/ForgotPasswordScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const router = useRouter();

  return (
    <ImageBackground
      source={require('../../assets/images/review.jpeg')}
      resizeMode="cover"
      style={styles.background}
    >
      <SafeAreaView style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>Reset Password</Text>
          <Text style={styles.subtitle}>Enter your email to reset your password</Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#bbb"
            value={email}
            onChangeText={setEmail}
          />

          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Send Reset Link</Text>
          </TouchableOpacity>

          <Text
            style={styles.backLink}
            onPress={() => router.back()}
          >
            ← Back to Login
          </Text>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  card: {
    backgroundColor: '#ffffff10',
    width: '100%',
    maxWidth: 360,
    padding: 30,
    borderRadius: 20,
    borderColor: '#fff2',
    borderWidth: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    height: 48,
    backgroundColor: '#ffffff20',
    borderRadius: 10,
    paddingHorizontal: 16,
    marginBottom: 16,
    color: '#fff',
    borderColor: '#fff4',
    borderWidth: 1,
  },
  loginButton: {
    backgroundColor: '#f98d45',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#f98d45',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 6,
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  backLink: {
    marginTop: 20,
    color: '#fbd44c',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
