import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Animated,
} from "react-native";
import { useRouter } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import Passwordmodal from "./PasswordModal";
import styles from "../../style/signupStyle/PasswordStyle";
import BackButton from "../../components/BackButton";
import { useTranslation } from "react-i18next";

const SignupPassword = () => {
  const { t } = useTranslation();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationMessage, setValidationMessage] = useState(t("signupPassword.minLength"));
  const [validationColor, setValidationColor] = useState("gray");
  const [confirmValidationMessage, setConfirmValidationMessage] = useState(t("signupPassword.mismatch"));
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
      setValidationMessage(t("signupPassword.minLength"));
      setValidationColor("#FF0000");
    } else {
      setValidationMessage(t(`signupPassword.strength.${strength}`));
      const colors = ["#FF0000", "#EE9D28", "#FAE100", "#9ACD32", "#00BF18"];
      setValidationColor(colors[strength] || "#ccc");
    }
  };

  const handleConfirmPasswordChange = (pw) => {
    setConfirmPassword(pw);
    const strength = calculatePasswordStrength(pw);
    setConfirmPasswordStrength(strength);

    if (pw === password) {
      setConfirmValidationMessage(t("signupPassword.match"));
      setConfirmValidationColor("green");
    } else {
      setConfirmValidationMessage(t("signupPassword.mismatch"));
      setConfirmValidationColor("red");
    }
  };

  const handlePasswordAttempt = () => {
    if (passwordStrength <= 1) {
      setPasswordModalVisible(true);
    } else if (passwordStrength >= 3 && password === confirmPassword) {
      handlePassword();
    } else if (password !== confirmPassword) {
      setConfirmValidationMessage(t("signupPassword.mismatch"));
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
        setValidationMessage(response.data.message || t("signupPassword.serverError"));
        setValidationColor("red");
      }
    } catch (error) {
      setValidationMessage(t("signupPassword.serverError"));
      setValidationColor("red");
    }
  };

  const getProgressBarColor = (strength) => {
    const colors = ["#FF0000", "#EE9D28", "#FAE100", "#9ACD32", "#00BF18"];
    return colors[strength] || "#ccc";
  };

  return (
    <View style={styles.screen}>
      <BackButton onPress={() => router.back()} />
      <View style={styles.card}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            {t("signupPassword.title")}
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={t("signupPassword.passwordPlaceholder")}
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
            placeholder={t("signupPassword.confirmPasswordPlaceholder")}
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
          <Text style={styles.buttonText}>{t("signupPassword.continue")}</Text>
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
