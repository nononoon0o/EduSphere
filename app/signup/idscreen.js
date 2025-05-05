/* 회원가입 아이디 입력창 */
import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { useRouter } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome"; // Importing FontAwesome icon
import axios from "axios"; 
import styleid from "../../style/signupStyle/IdScreenStyle";

const existingIDs = ['testUser', 'sampleID'];

const SignupID = () => {
  const [userID, setUserID] = useState("");
  const [validationMessage, setValidationMessage] = useState("");
  const [validationColor, setValidationColor] = useState("#888");
  const [isProcessing, setIsProcessing] = useState(false); // Loading state for processing ID
  const [isIDValid, setIsIDValid] = useState(false); // ID validation state
  const router = useRouter();

  // ID validation function (checks if the ID is at least 6 characters long and contains only alphanumeric characters)
  const isValidIDLength = (id) => id.length >= 6;
  const isValidIDCharacters = (id) => /^[a-zA-Z0-9]+$/.test(id);

  useEffect(() => {
    const trimmedID = userID.trim();

    if (!isValidIDLength(trimmedID)) {
      setValidationMessage("아이디를 6자 이상으로 적어주세요.");
      setValidationColor("red");
      setIsIDValid(false);
    } else if (!isValidIDCharacters(trimmedID)) {
      setValidationMessage("대소문자와 숫자만 사용해주세요.");
      setValidationColor("red");
      setIsIDValid(false);
    } else if (existingIDs.includes(trimmedID)) {
      setValidationMessage("이미 존재하는 아이디입니다. (로컬 검증)");
      setValidationColor("red");
      setIsIDValid(false);
    } else {
      setValidationMessage("아이디 형식이 올바릅니다.");
      setValidationColor("green");
      setIsIDValid(true);
    }
  }, [userID]);

  const handleNext = async () => {
    const trimmedID = userID.trim();

    if (!isValidIDLength(trimmedID) || !isValidIDCharacters(trimmedID)) {
      return; // If the ID is invalid, do not proceed
    }

    setIsProcessing(true); // Start processing the ID
    setValidationMessage("아이디 확인중...");
    setValidationColor("#888"); // Neutral color for processing

    try {
      const response = await axios.post(
        "http://localhost:5000/api/signup/id",
        {
          userID: trimmedID,
        },
        { withCredentials: true }
      );

      if (response.data.exists) {
        setValidationMessage("이미 존재하는 아이디입니다.");
        setValidationColor("red"); // Error color for existing ID
      } else {
        setValidationMessage("사용 가능한 아이디입니다.");
        setValidationColor("green"); // Success color for valid ID
        setTimeout(() => {
          router.push("/signup/password"); // Navigate to the next screen after a delay
        }, 1500);
      }
    } catch (error) {
      setValidationMessage("아이디 확인 중 오류가 발생했습니다.");
      setValidationColor("red");
    } finally {
      setIsProcessing(false); // Stop processing after checking
    }
  };

  // Clear the input field when the "X" icon is pressed
  const clearInput = () => {
    setUserID("");
    setValidationMessage(""); // Clear validation message as well
  };

  // Navigate back to the previous screen
  const handleBack = () => {
    router.push("/signup/signmail");
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
    <View style={styleid.container}>
      {/* Back icon */}
      <TouchableOpacity onPress={handleBack} style={styleid.backIcon}>
        <Icon name="arrow-left" size={20} color="#fff" />
      </TouchableOpacity>

      <View style={styleid.titleContainer}>
        <Text style={styleid.title}>
          아이디
      <Text style={styleid.whitetitle}>를 입력해주세요</Text>
    </Text>
    </View>

      {/* Display the validation message above the input, aligned to the left */}
      

      <View style={styleid.inputContainer}>
        <TextInput
          style={styleid.inputWithIcon} // Adjusted input style with space for icon
          placeholder="아이디를 입력해주세요"
          placeholderTextColor="#888"
          value={userID}
          onChangeText={setUserID}
          autoCapitalize="none"
          autoFocus // Automatically focuses on this input field, showing the keyboard
        />
        {/* Display the "X" icon only when there is input */}
        {userID.length > 0 && (
          <TouchableOpacity onPress={clearInput} style={styleid.clearIcon}>
            <Icon name="times-circle" size={15} color="#F48771" />
          </TouchableOpacity>
        )}
      </View>
      {validationMessage ? (
        <Text style={[styleid.validationText, { color: validationColor, textAlign: 'left', alignSelf: 'flex-start', marginLeft: 10 }]}>
          {validationMessage}
        </Text>
      ) : null}

      <TouchableOpacity
        style={styleid.button}
        onPress={handleNext}
        disabled={!isIDValid || isProcessing} // Disable the button if the ID is invalid or processing is in progress
      >
        <Text style={styleid.buttonText}>계속하기</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
  );
};

export default SignupID; 
