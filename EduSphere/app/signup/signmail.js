import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import stylemail from "../../style/signupStyle/EmailStyle";
import BackPressModal from "../find/BackPressModal";
import CodeModal from "./codemodal";

const SignupEmail = () => {
  const [email, setEmail] = useState("");
  const [validationMessage, setValidationMessage] = useState("");
  const [validationColor, setValidationColor] = useState("#888");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isBackModalVisible, setIsBackModalVisible] = useState(false);
  const [isCodeModalVisible, setIsCodeModalVisible] = useState(false);
  const router = useRouter();

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleBack = () => {
    setIsBackModalVisible(true);
  };

  const closeBackModal = () => {
    setIsBackModalVisible(false);
  };

  const confirmBack = () => {
    setIsBackModalVisible(false);
    router.push("/signin/loginScreen");
  };

  const handleNext = async () => {
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setValidationMessage("> 이메일을 입력해주세요.");
      setValidationColor("red");
      return;
    }

    if (!isValidEmail(trimmedEmail)) {
      setValidationMessage("> 이메일 형식이 올바르지 않습니다.");
      setValidationColor("red");
      return;
    }

    setIsProcessing(true);
    setValidationMessage("> 이메일 확인중...");
    setValidationColor("#888");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/signup/email",
        { email: trimmedEmail }
      );

      if (response.data.success) {
        setValidationMessage("사용 가능한 이메일입니다.");
        setValidationColor("green");
        setIsCodeModalVisible(true);
      } else {
        setValidationMessage(`> ${response.data.message}`);
        setValidationColor("red");
      }
    } catch (error) {
      setValidationMessage("> 서버 오류가 발생했습니다.");
      setValidationColor("red");
    } finally {
      setIsProcessing(false);
    }
  };

  const closeCodeModal = () => {
    setIsCodeModalVisible(false);
  };

  const confirmCodeModal = () => {
    setIsCodeModalVisible(false);
    router.push({
      pathname: "/signup/code",
      params: { email: email.trim() },
    });
  };

  const clearInput = () => {
    setEmail("");
    setValidationMessage("");
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={stylemail.container}>

        {/* 🔙 Back Button with Text */}
        <TouchableOpacity onPress={handleBack} style={stylemail.backButton}>
          <Icon name="arrow-left" size={20} color="#111827" style={{ marginRight: 6 }} />
          <Text style={stylemail.backButtonText}>뒤로가기</Text>
        </TouchableOpacity>

        <View style={stylemail.titleContainer}>
          <Text style={stylemail.title}>
            이메일
            <Text style={stylemail.whitetitle}>을 입력해주세요</Text>
          </Text>
        </View>

        <View style={stylemail.inputContainer}>
          <TextInput
            style={stylemail.inputWithIcon}
            placeholder="이메일을 입력해주세요"
            placeholderTextColor="#888"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoFocus
          />
          {email.length > 0 && (
            <TouchableOpacity onPress={clearInput} style={stylemail.clearIcon}>
              <Icon name="times-circle" size={15} color="#F48771" />
            </TouchableOpacity>
          )}
        </View>

        {validationMessage ? (
          <Text style={[stylemail.validationText, { color: validationColor }]}>
            {validationMessage}
          </Text>
        ) : null}

        <TouchableOpacity
          style={[
            stylemail.button,
            { backgroundColor: isProcessing ? "#A9A9A9" : "#3B82F6" },
          ]}
          onPress={handleNext}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={stylemail.buttonText}>인증코드 받기</Text>
          )}
        </TouchableOpacity>

        {/* 뒤로가기 모달 */}
        <BackPressModal
          visible={isBackModalVisible}
          onClose={closeBackModal}
          onConfirm={confirmBack}
          onText="회원가입"
        />

        {/* 이메일 확인 모달 */}
        <CodeModal
          visible={isCodeModalVisible}
          onClose={closeCodeModal}
          onConfirm={confirmCodeModal}
          onText="이메일"
        />
      </View>
    </ScrollView>
  );
};

export default SignupEmail;
