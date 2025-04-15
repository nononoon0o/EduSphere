// app/auth/RegisterScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function RegisterScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <ImageBackground
      source={require('../../assets/images/review.jpeg')}
      resizeMode="cover"
      style={styles.background}
    >
      <SafeAreaView style={styles.overlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1, width: '100%' }}
        >
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.card}>
              <Text style={styles.title}>Create Account</Text>
              <Text style={styles.subtitle}>Sign up to get started</Text>

              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#bbb"
                value={email}
                onChangeText={setEmail}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#bbb"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor="#bbb"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />

              <TouchableOpacity style={styles.loginButton}>
                <Text style={styles.loginButtonText}>Register</Text>
              </TouchableOpacity>

              <Text style={styles.bottomText}>
                Already have an account?{' '}
                <Text
                  style={styles.registerLink}
                  onPress={() => router.replace('/ProfileScreen')}

                >
                  Login
                </Text>
              </Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
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
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    width: '100%',
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
  bottomText: {
    marginTop: 30,
    textAlign: 'center',
    color: '#ccc',
  },
  registerLink: {
    color: '#fbd44c',
    fontWeight: 'bold',
  },
});