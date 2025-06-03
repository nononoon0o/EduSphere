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
  const [validationMessage, setValidationMessage] = useState("\ucd5c\uc18c 8\uae00\uc790 \uc774\uc0c1 \uc785\ub825\ud574\uc8fc\uc138\uc694.");
  const [validationColor, setValidationColor] = useState("gray");
  const [confirmValidationMessage, setConfirmValidationMessage] = useState("> \ube44\ubc00\ubc88\ud638\uc640 \ub3d9\uc77c\ud558\uac8c \uc785\ub825\ud574\uc8fc\uc138\uc694.");
  const [confirmValidationColor, setConfirmValidationColor] = useState("#fff");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordConfirmVisible, setPasswordConfirmVisible] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [confirmPasswordStrength, setConfirmPasswordStrength] = useState(0);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
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
      /[!@#$%^&*(),.?":{}|<>]/.test(password),
    ];
    const varietyCount = checks.filter(Boolean).length;
    return isLongEnough ? Math.min(varietyCount, 4) : 0;
  };

  const handlePasswordChange = (pw) => {
    setPassword(pw);
    const strength = calculatePasswordStrength(pw);
    setPasswordStrength(strength);

    if (!isValidPasswordLength(pw)) {
      setValidationMessage("> \ucd5c\uc18c 8\uae00\uc790 \uc774\uc0c1 \uc785\ub825\ud574\uc8fc\uc138\uc694.");
      setValidationColor("#FF0000");
    } else {
      const messages = [
        ["> \ube44\ubc00\ubc88\ud638 \uac15\ub3c4: \ub9e4\uc6b0 \uc57d\ud568", "#FF0000"],
        ["> \ube44\ubc00\ubc88\ud638 \uac15\ub3c4: \uc57d\ud568", "#EE9D28"],
        ["> \ube44\ubc00\ubc88\ud638 \uac15\ub3c4: \ubcf4\ud1b5", "#FAE100"],
        ["> \ube44\ubc00\ubc88\ud638 \uac15\ub3c4: \uac15\ud568", "#9ACD32"],
        ["> \ube44\ubc00\ubc88\ud638 \uac15\ub3c4: \ub9e4\uc6b0 \uac15\ud568", "#00BF18"],
      ];
      setValidationMessage(messages[strength][0]);
      setValidationColor(messages[strength][1]);
    }
  };

  const handleConfirmPasswordChange = (pw) => {
    setConfirmPassword(pw);
    const strength = calculatePasswordStrength(pw);
    setConfirmPasswordStrength(strength);

    if (pw === password) {
      setConfirmValidationMessage("> \ube44\ubc00\ubc88\ud638\uac00 \uc77c\uce58\ud569\ub2c8\ub2e4.");
      setConfirmValidationColor("green");
    } else {
      setConfirmValidationMessage("> \ube44\ubc00\ubc88\ud638\uac00 \uc77c\uce58\ud558\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4.");
      setConfirmValidationColor("red");
    }
  };

  const getProgressBarColor = (strength) => {
    const colors = ["#FF0000", "#EE9D28", "#FAE100", "#9ACD32", "#00BF18"];
    return colors[strength] || "#ccc";
  };

  const handlePasswordAttempt = () => {
    if (passwordStrength <= 1) {
      setPasswordModalVisible(true);
    } else if (passwordStrength >= 3 && password === confirmPassword) {
      handlePassword();
    } else if (password !== confirmPassword) {
      setConfirmValidationMessage("> \ube44\ubc00\ubc88\ud638\uac00 \uc77c\uce58\ud558\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4.");
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
        setValidationMessage(response.data.message || "> \uc11c\ubc84 \uc624\ub958 \ubc1c\uc0dd.");
        setValidationColor("red");
      }
    } catch (error) {
      setValidationMessage("> \uc11c\ubc84 \uc624\ub958 \ubc1c\uc0dd.");
      setValidationColor("red");
    }
  };

  return (
    <View style={styles.screen}>
      <BackButton onPress={() => router.back()} />

      <View style={styles.card}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
          비밀번호
          <Text style={styles.whitetitle}>를 입력해주세요</Text>
        </Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="비밀번호 입력"
            placeholderTextColor="#888"
            value={password}
            onChangeText={handlePasswordChange}
            secureTextEntry={!passwordVisible}
          />
          <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)}
            style={styles.eyeIcon}
          >
            <Icon name={passwordVisible ? "eye-slash" : "eye"} size={20} color="#888" />
          </TouchableOpacity>
        </View>

        <View style={styles.progressBarContainer}>
          {[...Array(4)].map((_, i) => (
            <View
              key={i}
              style={[
                styles.progressBarSegment,
                {
                  backgroundColor:
                    passwordStrength > i ? getProgressBarColor(passwordStrength) : "#ccc",
                },
              ]}
            />
          ))}
        </View>

        <Text style={[styles.validationText, { color: validationColor }]}>
          {validationMessage}
        </Text>

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
            <Icon name={passwordConfirmVisible ? "eye-slash" : "eye"} size={20} color="#888" />
          </TouchableOpacity>
        </View>

        <View style={styles.progressBarContainer}>
          {[...Array(4)].map((_, i) => (
            <View
              key={i}
              style={[
                styles.progressBarSegment,
                {
                  backgroundColor:
                    confirmPasswordStrength > i ? getProgressBarColor(confirmPasswordStrength) : "#ccc",
                },
              ]}
            />
          ))}
        </View>

        <Text style={[styles.validationText, { color: confirmValidationColor }]}>
          {confirmValidationMessage}
        </Text>

        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor:
                password === confirmPassword ? "#2563EB" : "#CBD5E1",
            },
          ]}
          onPress={handlePasswordAttempt}
          disabled={password !== confirmPassword}
        >
          <Text style={styles.buttonText}>계속하기</Text>
        </TouchableOpacity>
      </View>

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
