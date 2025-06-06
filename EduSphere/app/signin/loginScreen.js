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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";

const LoginScreen = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleBack = () => {
    router.push("/HomeScreen");
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { userID: userID.trim(), password: password.trim() },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        const token = response.data.token;
        const user = response.data.user;
        await AsyncStorage.setItem("token", token);
        await AsyncStorage.setItem("userData", JSON.stringify(user));

        if (user && user._id) {
          await AsyncStorage.setItem("mongoId", user._id.toString());
        }

        setErrorMessage("");
        Alert.alert(t("login.successTitle"), t("login.successMessage"));
        router.push("/HomeScreen");
      } else {
        const msg = response.data.message;
        if (msg === "비밀번호가 일치하지 않습니다.") {
          setErrorMessage(t("login.errorWrongPassword"));
        } else if (msg === "존재하지 않는 사용자입니다.") {
          setErrorMessage(t("login.errorNoUser"));
        } else {
          setErrorMessage(t("login.errorDefault"));
        }
      }
    } catch (error) {
      Alert.alert(t("login.errorTitle"), t("login.errorServer"));
      console.error(error);
    }
  };

  const handleAccount = () => router.push("/signup/signmail");
  const handleIdfind = () => router.push("/find/findmain");
  const testHome = () => router.push("/HomeScreen");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>EduSphere</Text>

      {errorMessage !== "" && (
        <Text style={{ color: "red", marginBottom: 10, fontWeight: "bold" }}>
          {errorMessage}
        </Text>
      )}

      {/* ID input */}
      <View style={styles.inputContainer}>
        <Icon name="user" size={20} color="#aaa" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder={t("login.userIdPlaceholder")}
          placeholderTextColor="#aaa"
          value={userID}
          onChangeText={setUserID}
        />
      </View>

      {/* Password input */}
      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="#aaa" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder={t("login.passwordPlaceholder")}
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

      {/* Login button */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>{t("login.loginButton")}</Text>
      </TouchableOpacity>

      {/* Footer options */}
      <View style={styles.options}>
        <TouchableOpacity onPress={handleIdfind}>
          <Text style={styles.optionText}>{t("login.findId")}</Text>
        </TouchableOpacity>
        <Text style={styles.separator}> | </Text>
        <TouchableOpacity onPress={handleIdfind}>
          <Text style={styles.optionText}>{t("login.findPassword")}</Text>
        </TouchableOpacity>
        <Text style={styles.separator}> | </Text>
        <TouchableOpacity onPress={handleAccount}>
          <Text style={styles.optionText}>{t("login.signup")}</Text>
        </TouchableOpacity>
        <Text style={styles.separator}> | </Text>
        <TouchableOpacity onPress={testHome}>
          <Text style={styles.optionText}>{t("login.test")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
