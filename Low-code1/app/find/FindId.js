import { Pressable, View, Text, TextInput } from "react-native";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import CustomModal from "./CustomModal";
import CountdownTimer from "../find/CountdownTimer";
import styles from "../../style/FindStyle";

function FindId() {
  const router = useRouter();
  const [idText, setIdText] = useState("");
  const [flag, setFlag] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [emailholder, setEmailholder] = useState("> 이메일을 입력해주세요.");
  const [numberholder, setNumberholder] =
    useState("> 인증번호를 입력해주세요.");
  const [end, setEnd] = useState(false);
  const [emailCenter, setEmailCenter] = useState(false);
  const today = new Date();
  const formattedDate = today.toISOString().slice(0, 10).replace(/-/g, ".");

  const handleTimerEnd = () => {
    setNumberholder("> 인증번호가 만료되었습니다.");
    setEnd(true);
  };

  return emailCenter ? (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", marginTop: 50 }}>
        <Text style={{ color: "#0097FB" }}>{idText}</Text>
        <Text style={{ color: "white" }}>와 일치하는</Text>
      </View>
      <View>
        <Text style={{ color: "white" }}>사용자 정보입니다.</Text>
      </View>
      <View style={styles.modalContainer}>
        <Text style={{ color: "white", margin: 10 }}>아이디:</Text>
        <Text style={{ color: "white", margin: 10 }}>
          가입일: {formattedDate}
        </Text>
      </View>
      <View style={{ width: "80%", marginTop: "auto" }}>
        <Pressable onPress={() => router.push("/")} style={styles.button}>
          <Text style={styles.buttonText}>로그인 화면으로 이동</Text>
        </Pressable>
      </View>
    </View>
  ) : (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="이메일을 입력해 주세요"
          placeholderTextColor="#AEAEAE"
          value={idText}
          onChangeText={setIdText}
          editable={!flag}
        />
        <Pressable
          onPress={() => setIdText("")}
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
                {/*여기에 인증번호가 일치하는지 확인 절차 필요*/}
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
                {/*이 부분에 이메일 인증 텍스트 추가  */}
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
                setEmailCenter(true);
              } else {
                setModalVisible(true);
              }
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>
              {flag ? "아이디 찾기" : "인증번호 받기"}
            </Text>
          </Pressable>
        </View>
      </View>
      <CustomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={() => {
          setModalVisible(false);
          setFlag(true);
        }}
        idText={idText}
      />
    </View>
  );
}

export default FindId;
