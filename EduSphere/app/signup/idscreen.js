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

const existingIDs = ['testUser', 'sampleID'];

const SignupID = () => {
  const router = useRouter();
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
      setValidationMessage("아이디를 6자 이상으로 적어주세요.");
      setValidationColor("#DC2626");
      setIsIDValid(false);
    } else if (!isValidIDCharacters(trimmedID)) {
      setValidationMessage("대소문자와 숫자만 사용해주세요.");
      setValidationColor("#DC2626");
      setIsIDValid(false);
    } else if (existingIDs.includes(trimmedID)) {
      setValidationMessage("이미 존재하는 아이디입니다. (로컬 검증)");
      setValidationColor("#DC2626");
      setIsIDValid(false);
    } else {
      setValidationMessage("아이디 형식이 올바릅니다.");
      setValidationColor("#10B981");
      setIsIDValid(true);
    }
  }, [userID]);

  const handleNext = async () => {
    const trimmedID = userID.trim();

    if (!isValidIDLength(trimmedID) || !isValidIDCharacters(trimmedID)) return;

    setIsProcessing(true);
    setValidationMessage("아이디 확인중...");
    setValidationColor("#888");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/signup/id",
        { userID: trimmedID },
        { withCredentials: true }
      );

      if (response.data.exists) {
        setValidationMessage("이미 존재하는 아이디입니다.");
        setValidationColor("#DC2626");
      } else {
        setValidationMessage("사용 가능한 아이디입니다.");
        setValidationColor("#10B981");
        setTimeout(() => {
          router.push("/signup/password");
        }, 1500);
      }
    } catch (error) {
      setValidationMessage("아이디 확인 중 오류가 발생했습니다.");
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
      <BackButton to="/signup/signmail" />

      <View style={styleid.card}>
        <Text style={styleid.title}>
          아이디 <Text style={styleid.highlight}>를 입력해주세요</Text>
        </Text>

        <View style={styleid.inputWrapper}>
          <TextInput
            style={styleid.input}
            placeholder="아이디를 입력해주세요"
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
          <Text style={styleid.buttonText}>계속하기</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SignupID;
