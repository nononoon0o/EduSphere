import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import axios from "axios";
import Icon from "react-native-vector-icons/FontAwesome";
import styleid from "../../style/signupStyle/IdScreenStyle";
import BackButton from "../../components/BackButton";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";

const existingIDs = ['testUser', 'sampleID'];

const SignupID = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const [userID, setUserID] = useState("");
  const [validationMessage, setValidationMessage] = useState("");
  const [validationColor, setValidationColor] = useState("#888");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isIDValid, setIsIDValid] = useState(false);

  const isValidIDLength = (id) => id.length >= 6;
  const isValidIDCharacters = (id) => /^[a-zA-Z0-9]+$/.test(id);

  useEffect(() => {
    const trimmedID = userID.trim();

    if (!isValidIDLength(trimmedID)) {
      setValidationMessage(t("signupID.shortID"));
      setValidationColor("#DC2626");
      setIsIDValid(false);
    } else if (!isValidIDCharacters(trimmedID)) {
      setValidationMessage(t("signupID.invalidCharacters"));
      setValidationColor("#DC2626");
      setIsIDValid(false);
    } else if (existingIDs.includes(trimmedID)) {
      setValidationMessage(t("signupID.duplicateLocal"));
      setValidationColor("#DC2626");
      setIsIDValid(false);
    } else {
      setValidationMessage(t("signupID.validFormat"));
      setValidationColor("#10B981");
      setIsIDValid(true);
    }
  }, [userID]);

  const handleNext = async () => {
    const trimmedID = userID.trim();

    if (!isValidIDLength(trimmedID) || !isValidIDCharacters(trimmedID)) return;

    setIsProcessing(true);
    setValidationMessage(t("signupID.checkingID"));
    setValidationColor("#888");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/signup/id",
        { userID: trimmedID },
        { withCredentials: true }
      );

      if (response.data.exists) {
        setValidationMessage(t("signupID.duplicateServer"));
        setValidationColor("#DC2626");
      } else {
        setValidationMessage(t("signupID.available"));
        setValidationColor("#10B981");
        setTimeout(() => {
          router.push("/signup/password");
        }, 1500);
      }
    } catch (error) {
      setValidationMessage(t("signupID.error"));
      setValidationColor("#DC2626");
    } finally {
      setIsProcessing(false);
    }
  };

  const clearInput = () => {
    setUserID("");
    setValidationMessage("");
  };

  return (
    <ScrollView contentContainerStyle={styleid.scroll}>
      <BackButton onPress={() => router.back()} />

      <View style={styleid.card}>
        <Text style={styleid.title}>
          {t("signupID.title")} <Text style={styleid.highlight}>{t("signupID.highlight")}</Text>
        </Text>

        <View style={styleid.inputWrapper}>
          <TextInput
            style={styleid.input}
            placeholder={t("signupID.placeholder")}
            placeholderTextColor="#9CA3AF"
            value={userID}
            onChangeText={setUserID}
            autoCapitalize="none"
            autoFocus
          />
          {userID.length > 0 && (
            <TouchableOpacity onPress={clearInput} style={styleid.clearIcon}>
              <Icon name="times-circle" size={16} color="#EF4444" />
            </TouchableOpacity>
          )}
        </View>

        {validationMessage ? (
          <Text style={[styleid.validationText, { color: validationColor }]}>
            {validationMessage}
          </Text>
        ) : null}

        <TouchableOpacity
          style={[
            styleid.button,
            (!isIDValid || isProcessing) && styleid.buttonDisabled,
          ]}
          onPress={handleNext}
          disabled={!isIDValid || isProcessing}
        >
          <Text style={styleid.buttonText}>{t("signupID.continue")}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SignupID;
