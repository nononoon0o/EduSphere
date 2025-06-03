import React, { useState, useRef, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Animated,
} from "react-native";
import { useRouter } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import Passwordmodal from "./PasswordModal";
import styles from "../../style/signupStyle/PasswordStyle";
import BackButton from "../../components/BackButton"; // ✅ Reusable BackButton

const SignupPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationMessage, setValidationMessage] = useState("최소 8글자 이상 입력해주세요.");
  const [validationColor, setValidationColor] = useState("gray");
  const [confirmValidationMessage, setConfirmValidationMessage] = useState("> 비밀번호와 동일하게 입력해주세요.");
  const [confirmValidationColor, setConfirmValidationColor] = useState("#fff");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordConfirmVisible, setPasswordConfirmVisible] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [confirmationModalVisible, setConfirmationModalVisible] = useState(false);
  const progressAnim = useRef(new Animated.Value(0)).current;
  const router = useRouter();

  const isValidPasswordLength = (password) => password.length >= 8;

  const calculatePasswordStrength = (password) => {
    if (/^(.)\1+$/.test(password)) return 0;

    const isLongEnough = password.length >= 8;
    const checks = [
      /[a-z]/.test(password),
      /[A-Z]/.test(password),
      /\d/.test(password),
      /[!@#$%^&*(),.?":{}|<>]/.test(password)
    ];

    const varietyCount = checks.filter(Boolean).length;
    const strength = isLongEnough ? varietyCount : 0;

    return Math.min(strength, 4);
  };

  const handlePasswordChange = (pw) => {
    setPassword(pw);
    const isValidLength = isValidPasswordLength(pw);
    const strength = calculatePasswordStrength(pw);
    setPasswordStrength(strength);

    if (!isValidLength) {
      setValidationMessage("> 최소 8글자 이상 입력해주세요.");
      setValidationColor("#FF0000");
      return;
    }

    switch (strength) {
      case 0:
        setValidationMessage("> 비밀번호 강도: 매우 약함");
        setValidationColor("#FF0000");
        break;
      case 1:
        setValidationMessage("> 비밀번호 강도: 약함");
        setValidationColor("#EE9D28");
        break;
      case 2:
        setValidationMessage("> 비밀번호 강도: 보통");
        setValidationColor("#FAE100");
        break;
      case 3:
        setValidationMessage("> 비밀번호 강도: 강함");
        setValidationColor("#9ACD32");
        break;
      case 4:
        setValidationMessage("> 비밀번호 강도: 매우 강함");
        setValidationColor("#00BF18");
        break;
    }
  };

  const handleConfirmPasswordChange = (pw) => {
    setConfirmPassword(pw);

    if (pw === password) {
      setConfirmValidationMessage("> 비밀번호가 일치합니다.");
      setConfirmValidationColor("green");
    } else {
      setConfirmValidationMessage("> 비밀번호가 일치하지 않습니다.");
      setConfirmValidationColor("red");
    }
  };

  const getProgressBarColor = () => {
    switch (passwordStrength) {
      case 0: return "#FF0000";
      case 1: return "#EE9D28";
      case 2: return "#FAE100";
      case 3: return "#9ACD32";
      case 4: return "#00BF18";
    }
  };

  const handlePasswordAttempt = () => {
    if (passwordStrength <= 1) {
      setPasswordModalVisible(true);
    } else if (passwordStrength >= 3 && password === confirmPassword) {
      setConfirmationModalVisible(true);
      handlePassword();
    } else if (password !== confirmPassword) {
      setConfirmValidationMessage("> 비밀번호가 일치하지 않습니다.");
      setConfirmValidationColor("red");
    }
  };

  const handlePassword = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/signup/pw",
        { password },
        { withCredentials: true }
      );

      if (response.data.success) {
        router.push("/signup/detailScreen");
      } else {
        setValidationMessage(response.data.message || "> 서버 오류 발생.");
        setValidationColor("red");
      }
    } catch (error) {
      setValidationMessage("> 서버 오류 발생.");
      setValidationColor("red");
      console.error("Signup Error: ", error);
    }
  };

  const handleBack = () => {
    router.back();
  };

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: (passwordStrength / 4) * 100,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [passwordStrength]);

  const isPasswordsMatching = password === confirmPassword;

  return (
    <View style={styles.container}>
      {/* ✅ Reusable Back Button */}
      <BackButton onPress={handleBack} />

      {/* 타이틀 */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          비밀번호
          <Text style={styles.whitetitle}>를 입력해주세요</Text>
        </Text>
      </View>

      {/* 비밀번호 입력 */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="비밀번호 입력"
          placeholderTextColor="#888"
          value={password}
          onChangeText={handlePasswordChange}
          secureTextEntry={!passwordVisible}
          autoFocus
        />
        <TouchableOpacity
          onPress={() => setPasswordVisible(!passwordVisible)}
          style={styles.eyeIcon}
        >
          <Icon
            name={passwordVisible ? "eye-slash" : "eye"}
            size={20}
            color="#888"
          />
        </TouchableOpacity>
      </View>

      {/* 강도 표시 */}
      <View style={styles.progressBarContainer}>
        {[...Array(4)].map((_, index) => (
          <View
            key={index}
            style={[styles.progressBarSegment, {
              backgroundColor: passwordStrength > index ? getProgressBarColor() : "#ccc",
            }]}
          />
        ))}
      </View>

      <Text style={[styles.validationText, { color: validationColor }]}>
        {validationMessage}
      </Text>

      {/* 비밀번호 확인 */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="비밀번호 확인"
          placeholderTextColor="#888"
          value={confirmPassword}
          onChangeText={handleConfirmPasswordChange}
          secureTextEntry={!passwordConfirmVisible}
        />
        <TouchableOpacity
          onPress={() => setPasswordConfirmVisible(!passwordConfirmVisible)}
          style={styles.eyeIcon}
        >
          <Icon
            name={passwordConfirmVisible ? "eye-slash" : "eye"}
            size={20}
            color="#888"
          />
        </TouchableOpacity>
      </View>

      <Text style={[styles.validationText, { color: confirmValidationColor }]}>
        {confirmValidationMessage}
      </Text>

      {/* 완료 버튼 */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: isPasswordsMatching ? "#094771" : "#ccc" }]}
        onPress={handlePasswordAttempt}
        disabled={!isPasswordsMatching}
      >
        <Text style={styles.buttonText}>계속하기</Text>
      </TouchableOpacity>

      {/* Password Modal */}
      {passwordModalVisible && (
        <Passwordmodal
          visible={passwordModalVisible}
          onConfirm={() => {
            handlePassword();
            setPasswordModalVisible(false);
          }}
          onCancel={() => setPasswordModalVisible(false)}
        />
      )}
    </View>
  );
};

export default SignupPassword;
