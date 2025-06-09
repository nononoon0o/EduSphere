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
import { useTranslation } from "react-i18next";
import BackButton from '../../components/BackButton';
import CodeModal from "./codemodal";
import CountdownTimer from "../find/CountdownTimer";
import styles from "../../style/signupStyle/CodeStyle";

const VerificationScreen = () => {
  const { email } = useLocalSearchParams();
  const router = useRouter();
  const { t } = useTranslation();
  const inputRefs = useRef([]);

  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [validationKey, setValidationKey] = useState("verification.checking");
  const [validationColor, setValidationColor] = useState("#888");
  const [isVerified, setIsVerified] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [remainingTime, setRemainingTime] = useState(300);

  const handleVerifyCode = async () => {
    setIsLoading(true);
    setValidationKey("verification.verifying");
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
        setValidationKey("verification.verified");
        setValidationColor("#00FF00");
        setModalVisible(true);
      } else {
        setValidationKey("verification.wrongCode");
        setValidationColor("#FF0000");
      }
    } catch (error) {
      setValidationKey("verification.serverError");
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
        setValidationKey("verification.resendSuccess");
        setValidationColor("#0097FB");
      } else {
        setValidationKey("verification.resendFail");
        setValidationColor("red");
      }
    } catch (error) {
      setValidationKey("verification.serverError");
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
    setValidationKey("verification.expired");
    setValidationColor("#FF0000");
  };

  const handleModalConfirm = () => {
    setModalVisible(false);
    router.push("/signup/idscreen");
  };

  return (
    <View style={styles.container}>
      <BackButton onPress={() => router.back()} />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          {t("verification.title")}
          <Text style={styles.whitetitle}>{t("verification.titleAccent")}</Text>
        </Text>
      </View>

      <Text style={[styles.emailText, { color: validationColor }]}>
        {t(validationKey, { email })}
      </Text>

      <Text
        style={[
          styles.expirationText,
          {
            color:
              remainingTime > 200
                ? "#10B981"
                : remainingTime > 100
                ? "#FACC15"
                : "#EF4444",
          },
        ]}
      >
        {t("verification.expiresIn")}{" "}
        <CountdownTimer
          initialTime={300}
          onTimerEnd={handleTimerEnd}
          onTick={(timeLeft) => setRemainingTime(timeLeft)}
        />
      </Text>

      <View style={styles.codeContainer}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)}
            style={[
              styles.input,
              {
                backgroundColor: digit ? "#DBEAFE" : "#E0F2FE",
                borderColor: digit ? "#2563EB" : "#3B82F6",
              },
            ]}
            value={digit}
            keyboardType="numeric"
            maxLength={1}
            onChangeText={(value) => handleInputChange(value, index)}
          />
        ))}
      </View>

      {!isVerified && (
        <TouchableOpacity style={styles.resendButton} onPress={handleResendCode}>
          <Text style={styles.resendButtonText}>{t("verification.resendCode")}</Text>
        </TouchableOpacity>
      )}

      {!isVerified && (
        <TouchableOpacity
          style={[
            styles.continueButton,
            {
              backgroundColor:
                code.join("").length === 6 ? "#007BFF" : "#A9A9A9",
            },
          ]}
          onPress={handleVerifyCode}
          disabled={code.join("").length !== 6 || isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={styles.continueButtonText}>{t("verification.continue")}</Text>
          )}
        </TouchableOpacity>
      )}

      <CodeModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={handleModalConfirm}
        onText={t("verification.code")}
      />
    </View>
  );
};

export default VerificationScreen;
