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
import axios from "axios";
import { useTranslation } from "react-i18next"; // ✅ Added
import stylemail from "../../style/signupStyle/EmailStyle";
import BackPressModal from "../find/BackPressModal";
import CodeModal from "./codemodal";
import BackButton from "../../components/BackButton";

const SignupEmail = () => {
  const [email, setEmail] = useState("");
  const [validationMessage, setValidationMessage] = useState("");
  const [validationColor, setValidationColor] = useState("#888");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isBackModalVisible, setIsBackModalVisible] = useState(false);
  const [isCodeModalVisible, setIsCodeModalVisible] = useState(false);
  const router = useRouter();
  const { t } = useTranslation(); // ✅ Added

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleBack = () => setIsBackModalVisible(true);
  const closeBackModal = () => setIsBackModalVisible(false);
  const confirmBack = () => {
    setIsBackModalVisible(false);
    router.push("/signin/loginScreen");
  };

  const handleNext = async () => {
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setValidationMessage(t("signupEmail.empty"));
      setValidationColor("red");
      return;
    }

    if (!isValidEmail(trimmedEmail)) {
      setValidationMessage(t("signupEmail.invalid"));
      setValidationColor("red");
      return;
    }

    setIsProcessing(true);
    setValidationMessage(t("signupEmail.checking"));
    setValidationColor("#888");

    try {
      const response = await axios.post("http://localhost:5000/api/signup/email", {
        email: trimmedEmail,
      });

      if (response.data.success) {
        setValidationMessage(t("signupEmail.valid"));
        setValidationColor("green");
        setIsCodeModalVisible(true);
      } else {
        setValidationMessage(`> ${response.data.message}`);
        setValidationColor("red");
      }
    } catch (error) {
      setValidationMessage(t("signupEmail.serverError"));
      setValidationColor("red");
    } finally {
      setIsProcessing(false);
    }
  };

  const closeCodeModal = () => setIsCodeModalVisible(false);
  const confirmCodeModal = () => {
    setIsCodeModalVisible(false);
    router.push({ pathname: "/signup/code", params: { email: email.trim() } });
  };
  const clearInput = () => {
    setEmail("");
    setValidationMessage("");
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={stylemail.container}>
        <BackButton onPress={handleBack} label={t("signupEmail.back")} />

        <View style={stylemail.titleContainer}>
          <Text style={stylemail.title}>
            {t("signupEmail.email")}
            <Text style={stylemail.whitetitle}>{t("signupEmail.enter")}</Text>
          </Text>
        </View>

        <View style={stylemail.inputContainer}>
          <TextInput
            style={stylemail.inputWithIcon}
            placeholder={t("signupEmail.placeholder")}
            placeholderTextColor="#888"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoFocus
          />
          {email.length > 0 && (
            <TouchableOpacity onPress={clearInput} style={stylemail.clearIcon}>
              <Text style={{ fontSize: 16, color: "#F48771" }}>×</Text>
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
            <Text style={stylemail.buttonText}>{t("signupEmail.getCode")}</Text>
          )}
        </TouchableOpacity>

        <BackPressModal
          visible={isBackModalVisible}
          onClose={closeBackModal}
          onConfirm={confirmBack}
          onText={t("signupEmail.signup")}
        />

        <CodeModal
          visible={isCodeModalVisible}
          onClose={closeCodeModal}
          onConfirm={confirmCodeModal}
          onText={t("signupEmail.email")}
        />
      </View>
    </ScrollView>
  );
};

export default SignupEmail;
