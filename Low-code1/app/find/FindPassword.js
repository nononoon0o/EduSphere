import { Pressable, View, Text, TextInput } from "react-native";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import CustomModal from "./CustomModal";
import CountdownTimer from "../find/CountdownTimer";
import styles from "../../style/FindStyle";

function FindPassword() {
  const router = useRouter();
  const [pwText, setPwText] = useState(""); //인증번호
  const [flag, setFlag] = useState(false);
  const [currentStep, setCurrentStep] = useState("inputEmail"); // 각 단계별로 화면 변경을 위해 선언
  const [modalVisible, setModalVisible] = useState(false);
  const [emailholder, setEmailholder] = useState("> 이메일을 입력해주세요.");
  const [passwordColor, setPasswordColor] = useState("#FFFFFF");
  const [numberholder, setNumberholder] =
    useState("> 인증번호를 입력해주세요.");
  const [end, setEnd] = useState(false); // 시간 끝났는지 여부
  const [password, setPassword] = useState("");
  const [passwordHolder, setPasswordHolder] =
    useState("> 8자리 이상 입력해주세요");
  const [strengthLevel, setStrengthLevel] = useState(1); //비밀번호 강도 여부
  const [confirmPassword, setConfirmPassword] = useState(""); //비밀번호 확인
  const [passwordVisible, setPasswordVisible] = useState(false); // 비밀번호 눈 아이콘 flag
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false); // 비밀번호 눈 아이콘 flag

  const handleConfirmPasswordChange = (pw) => {
    setConfirmPassword(pw);
  };
  const handlePasswordChange = (pw) => {
    setPassword(pw);
    const level = getStrengthLevel(pw);
    setStrengthLevel(getStrengthLevel(pw));
    switch (level) {
      case 0:
        setPasswordHolder("비밀번호 강도: 매우 약함");
        setPasswordColor("#FF0000");
        break;
      case 1:
        setPasswordHolder("비밀번호 강도: 약함");
        setPasswordColor("#EE9D28");
        break;
      case 2:
        setPasswordHolder("비밀번호 강도: 보통");
        setPasswordColor("#FAE100");
        break;
      case 3:
        setPasswordHolder("비밀번호 강도: 강함");
        setPasswordColor("#9ACD32");
        break;
      case 4:
        setPasswordHolder("비밀번호 강도: 매우 강함");
        setPasswordColor("#00BF18");
        break;
      default:
        break;
    }
  };
  const getStrengthLevel = (pw) => {
    if (pw.length === 0) return 0; // 매우 약함
    if (pw.length < 3) return 1; // 약함
    if (pw.length < 6) return 2; // 보통
    if (pw.length < 9) return 3; // 강함
    return 4; // 매우 강함
  };
  const handleTimerEnd = () => {
    setNumberholder("> 인증번호가 만료되었습니다.");
    setEnd(true);
  };
  const renderInputEmail = () => {
    return (
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="이메일을 입력해 주세요"
          placeholderTextColor="#AEAEAE"
          value={pwText}
          onChangeText={setPwText}
          editable={!flag}
        />
        <Pressable
          onPress={() => setPwText("")}
          style={{ position: "absolute", right: 10, top: 20 }}
          disabled={flag}
        >
          <FontAwesome5 name="times-circle" size={15} color="#F48771" />
        </Pressable>
        <Text style={styles.inputPlaceholder}>{emailholder}</Text>
        {flag && (
          <>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 30,
              }}
            >
              <TextInput
                style={styles.numberinput}
                placeholder="인증번호를 입력해주세요"
                placeholderTextColor="#AEAEAE"
              />
              <Pressable style={styles.confirmButton}>
                <Text style={styles.confirmText}>확인</Text>
              </Pressable>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  ...styles.inputPlaceholder,
                  color: end ? "red" : "white",
                }}
              >
                {numberholder}
              </Text>
              <CountdownTimer initialTime={300} onTimerEnd={handleTimerEnd} />
            </View>
          </>
        )}
        <View style={{ width: "100%", marginTop: "auto" }}>
          <Pressable
            onPress={() => {
              if (flag) {
                setCurrentStep("inputPassword");
              } else {
                setModalVisible(true);
              }
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>
              {flag ? "비밀번호 재설정하기" : "인증번호 받기"}
            </Text>
          </Pressable>
        </View>
      </View>
    );
  };
  const renderInputPassword = () => {
    //비밀번호 강도별 게이지 변경 완료  모달은 나중에 추가

    return (
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="새로운 비밀번호"
          placeholderTextColor="#AEAEAE"
          secureTextEntry={!passwordVisible}
          value={password}
          onChangeText={handlePasswordChange}
        />
        <Pressable
          style={{ position: "absolute", right: 10, top: 20 }}
          onPress={() => setPasswordVisible(!passwordVisible)}
        >
          <FontAwesome5
            name={passwordVisible ? "eye" : "eye-slash"}
            size={15}
            color="#F48771"
          />
        </Pressable>
        <View style={{ flexDirection: "row", marginTop: 10, width: "100%" }}>
          {[...Array(4)].map((_, index) => (
            <View
              key={index}
              style={{
                width: "24%",
                height: 3,
                backgroundColor:
                  index < strengthLevel ? passwordColor : "#606060",
                marginRight: 2,
                borderRadius: 10,
              }}
            />
          ))}
        </View>
        <Text style={{ color: passwordColor, marginTop: 5, fontSize: 11 }}>
          {passwordHolder}
        </Text>
        <View style={{ marginTop: 15 }}>
          <TextInput
            style={styles.input}
            placeholder="비밀번호 확인"
            placeholderTextColor="#AEAEAE"
            secureTextEntry={!confirmPasswordVisible}
            onChangeText={handleConfirmPasswordChange}
          />
          <Pressable
            style={{ position: "absolute", right: 10, top: 20 }}
            onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
          >
            <FontAwesome5
              name={confirmPasswordVisible ? "eye" : "eye-slash"}
              size={15}
              color="#F48771"
            />
          </Pressable>
        </View>
        <Text style={{ color: "#FFFFFF", marginTop: 5, fontSize: 10 }}>
          {">"} 위에 비밀번호와 동일하게 입력해주세요
        </Text>
        <View style={{ width: "100%", marginTop: "auto" }}>
          <Pressable
            onPress={() => {
              setCurrentStep("success");
            }}
            style={[
              styles.button,
              {
                backgroundColor:
                  password === confirmPassword ? "#094771" : "#444444",
              },
            ]}
            disabled={password !== confirmPassword}
          >
            <Text style={styles.buttonText}>비밀번호 재설정</Text>
          </Pressable>
        </View>
      </View>
    );
  };
  const renderSuccessMessage = () => {
    return (
      <View
        style={{
          width: "100%",
          alignItems: "center",
          marginTop: 100,
          flex: 1,
        }}
      >
        <Text style={{ color: "white", textAlign: "center", fontSize: 20 }}>
          {" "}
          비밀번호가 성공적으로
        </Text>
        <Text style={{ color: "#0097FB", textAlign: "center", fontSize: 20 }}>
          변경되었습니다.
        </Text>
        <View style={{ width: "80%", marginTop: "auto" }}>
          <Pressable onPress={() => router.push("/")} style={styles.button}>
            <Text style={styles.buttonText}>로그인 화면으로 이동</Text>
          </Pressable>
        </View>
      </View>
    );
  };
  const renderStep = () => {
    switch (currentStep) {
      case "inputEmail":
        return renderInputEmail();
      case "inputPassword":
        return renderInputPassword();
      case "success":
        return renderSuccessMessage();
      default:
        return null;
    }
  };
  return (
    <View style={styles.container}>
      {renderStep()}
      <CustomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={() => {
          setModalVisible(false);
          setFlag(true);
        }}
        idText={pwText}
      />
    </View>
  );
}

export default FindPassword;
