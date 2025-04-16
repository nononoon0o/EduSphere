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
import styles from "../../style/CodeStyle";

const VerificationScreen = () => {
  const params = useLocalSearchParams();
  const email = params.email;
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [codeColor] = useState("#0097FB");
  const [validationMessage, setValidationMessage] = useState(
    `> ${email} 확인 진행중...`
  );
  const [validationColor, setValidationColor] = useState("#888");
  const [isVerified, setIsVerified] = useState(false); // 인증 성공 상태
  const [modalVisible, setModalVisible] = useState(false); // 모달 상태
  const [modalMessage, setModalMessage] = useState(""); // 모달 메시지
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가

  const inputRefs = useRef([]);
  const router = useRouter();

  // 인증번호 확인 처리
  const handleVerifyCode = async () => {
    setIsLoading(true); // 로딩 시작
    setValidationMessage("> 인증번호 확인중...");
    setValidationColor("#888");

    try {
      const verificationCode = code.join("");
      console.log("전송된 이메일:", email);
      console.log("전송된 인증코드:", verificationCode);

      const response = await axios.post(
        "http://localhost:5000/api/signup/code",
        {
          email: email,
          code: verificationCode,
        },
        { withCredentials: true }
      );

      if (response.data.success) {
        setIsVerified(true);
        setValidationMessage("> 인증번호가 확인되었습니다.");
        setValidationColor("#00FF00");
        setModalMessage("인증번호가 일치하였습니다.");
        setModalVisible(true); // 인증 성공 시 모달 표시
      } else {
        setValidationMessage("> 인증코드가 틀립니다.");
        setValidationColor("#FF0000");
      }
    } catch (error) {
      setValidationMessage("> 서버 오류가 발생했습니다.");
      setValidationColor("red");
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  };

  // 인증번호 재전송 처리 -> 아직 기능 안되는 것.
  const handleResendCode = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/signup/resend",
        { email: email },
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

  // 입력 값 변경 처리
  const handleInputChange = (value, index) => {
    if (/^\d$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (index < 5) {
        inputRefs.current[index + 1].focus();
      }
    } else if (value === "") {
      const newCode = [...code];
      newCode[index] = "";
      setCode(newCode);
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  // 타이머 종료 처리
  const handleTimerEnd = () => {
    setValidationMessage("> 인증번호가 만료되었습니다.");
    setValidationColor("#FF0000");
  };

  // 모달 확인 버튼 처리
  const handleModalConfirm = () => {
    setModalVisible(false); // 모달 닫기
    router.push("/signup/idscreen"); // 다음 화면으로 이동
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          인증코드
          <Text style={styles.whitetitle}>를 입력해주세요</Text>
        </Text>
      </View>

      <Text style={[styles.emailText, { color: validationColor }]}>
        {validationMessage}
      </Text>
      <Text style={styles.expirationText}>
        인증번호 만료까지{" "}
        <CountdownTimer
          initialTime={300} // 5 minutes
          onTimerEnd={handleTimerEnd}
        />
      </Text>

      <View style={styles.codeContainer}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)}
            style={[styles.input, { borderColor: codeColor }]}
            value={digit}
            keyboardType="numeric"
            maxLength={1}
            onChangeText={(value) => handleInputChange(value, index)}
          />
        ))}
      </View>

      {!isVerified && (
        <TouchableOpacity
          style={styles.resendButton}
          onPress={handleResendCode}
        >
          <Text style={styles.resendButtonText}>인증번호를 재전송해주세요</Text>
        </TouchableOpacity>
      )}

      {!isVerified ? (
        <TouchableOpacity
          style={[
            styles.continueButton,
            {
              backgroundColor:
                code.join("").length === 6 ? "#007BFF" : "#A9A9A9",
            },
          ]}
          onPress={handleVerifyCode}
          disabled={code.join("").length !== 6 || isLoading} // 로딩 중에는 버튼 비활성화
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={styles.continueButtonText}>계속하기</Text>
          )}
        </TouchableOpacity>
      ) : null}

      {/* CodeModal 추가 */}
      <CodeModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)} // 모달 닫기
        onConfirm={handleModalConfirm} // 확인 버튼 처리
        onText="인증번호" // 모달 메시지
      />
    </View>
  );
};

export default VerificationScreen;
