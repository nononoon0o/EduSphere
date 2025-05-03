import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import styles from "../../style/signinStyle/loginStyle";
import AsyncStorage from "@react-native-async-storage/async-storage"; // JWT 저장용

const LoginScreen = () => {
  const router = useRouter();
  const [userID, setUserID] = useState(""); // 아이디 상태
  const [password, setPassword] = useState(""); // 비밀번호 상태
  const [passwordVisible, setPasswordVisible] = useState(false); // 비밀번호 가시성 상태
  const [errorMessage, setErrorMessage] = useState("");

  const handleBack = () => {
    router.push("/ProfileScreen");
  };

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
        await AsyncStorage.setItem('userData', JSON.stringify(response.data.user));
        setErrorMessage("");
        Alert.alert("로그인 성공", "홈 화면으로 이동합니다.");
        router.push("/HomeScreen"); // 홈 화면으로 이동
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
    router.push("/signup/signmail");
  };

  const handleIdfind = () => {
    router.push("/find/findmain");
  };

  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>EduSphere</Text>
    
      {/* 에러 메시지 표시 */}
      {errorMessage !== "" && (
        <Text style={{ color: "red", marginBottom: 10, fontWeight: "bold" }}>
          {errorMessage}
        </Text>
      )}

      {/* ID 입력 필드 */}
      <View style={styles.inputContainer}>
        <Icon name="user" size={20} color="#aaa" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="아이디"
          placeholderTextColor="#aaa"
          value={userID}
          onChangeText={setUserID}
        />
      </View>

      {/* 비밀번호 입력 필드 */}
      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="#aaa" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="비밀번호"
          secureTextEntry={!passwordVisible}
          placeholderTextColor="#aaa"
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          <Icon
            name={passwordVisible ? "eye" : "eye-slash"}
            size={20}
            color="#aaa"
            style={styles.eyeIcon}
          />
        </TouchableOpacity>
      </View>

      {/* 로그인 버튼 */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>로그인</Text>
      </TouchableOpacity>

      {/* 옵션들 */}
      <View style={styles.options}>
        <TouchableOpacity onPress={handleIdfind}>
          <Text style={styles.optionText}>아이디찾기</Text>
        </TouchableOpacity>
        <Text style={styles.separator}> | </Text>
        <TouchableOpacity onPress={handleIdfind}>
          <Text style={styles.optionText}>비밀번호찾기</Text>
        </TouchableOpacity>
        <Text style={styles.separator}> | </Text>
        <TouchableOpacity onPress={handleAccount}>
          <Text style={styles.optionText}>회원가입</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
