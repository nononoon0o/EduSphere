import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import axios from "axios";
import CodeModal from "./codemodal";
import CountdownTimer from "../find/CountdownTimer";
import styles from "../../style/signupStyle/CodeStyle";

const VerificationScreen = () => {
  const { email } = useLocalSearchParams();
  const router = useRouter();
  const inputRefs = useRef([]);

  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [validationMessage, setValidationMessage] = useState(`> ${email} 확인 진행중...`);
  const [validationColor, setValidationColor] = useState("#888");
  const [isVerified, setIsVerified] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleVerifyCode = async () => {
    setIsLoading(true);
    setValidationMessage("> 인증번호 확인중...");
    setValidationColor("#888");

    try {
      const verificationCode = code.join("");
      const response = await axios.post(
        "http://localhost:5000/api/signup/code",
        { email, code: verificationCode },
        { withCredentials: true }
      );

      if (response.data.success) {
        setIsVerified(true);
        setValidationMessage("> 인증번호가 확인되었습니다.");
        setValidationColor("#00FF00");
        setModalVisible(true);
      } else {
        setValidationMessage("> 인증코드가 틀립니다.");
        setValidationColor("#FF0000");
      }
    } catch (error) {
      setValidationMessage("> 서버 오류가 발생했습니다.");
      setValidationColor("red");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/signup/resend",
        { email },
        { withCredentials: true }
      );

      if (response.data.success) {
        setValidationMessage("> 인증번호가 재전송되었습니다.");
        setValidationColor("#0097FB");
      } else {
        setValidationMessage("> 인증번호 재전송에 실패했습니다.");
        setValidationColor("red");
      }
    } catch (error) {
      setValidationMessage("> 서버 오류가 발생했습니다.");
      setValidationColor("red");
    }
  };

  const handleInputChange = (value, index) => {
    if (/^\d$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      if (index < 5) inputRefs.current[index + 1]?.focus();
    } else if (value === "") {
      const newCode = [...code];
      newCode[index] = "";
      setCode(newCode);
      if (index > 0) inputRefs.current[index - 1]?.focus();
    }
  };

  const handleTimerEnd = () => {
    setValidationMessage("> 인증번호가 만료되었습니다.");
    setValidationColor("#FF0000");
  };

  const handleModalConfirm = () => {
    setModalVisible(false);
    router.push("/signup/idscreen");
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>인증코드<Text style={styles.whitetitle}>를 입력해주세요</Text></Text>
      </View>

      <Text style={[styles.emailText, { color: validationColor }]}>
        {validationMessage}
      </Text>

      <Text style={styles.expirationText}>
        인증번호 만료까지 <CountdownTimer initialTime={300} onTimerEnd={handleTimerEnd} />
      </Text>

      <View style={styles.codeContainer}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)}
            style={[styles.input, { borderColor: "#0097FB" }]}
            value={digit}
            keyboardType="numeric"
            maxLength={1}
            onChangeText={(value) => handleInputChange(value, index)}
          />
        ))}
      </View>

      {!isVerified && (
        <TouchableOpacity style={styles.resendButton} onPress={handleResendCode}>
          <Text style={styles.resendButtonText}>인증번호를 재전송해주세요</Text>
        </TouchableOpacity>
      )}

      {!isVerified && (
        <TouchableOpacity
          style={[styles.continueButton, {
            backgroundColor: code.join("").length === 6 ? "#007BFF" : "#A9A9A9"
          }]}
          onPress={handleVerifyCode}
          disabled={code.join("").length !== 6 || isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={styles.continueButtonText}>계속하기</Text>
          )}
        </TouchableOpacity>
      )}

      <CodeModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={handleModalConfirm}
        onText="인증번호"
      />
    </View>
  );
};

export default VerificationScreen;
