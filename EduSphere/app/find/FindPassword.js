import { Pressable, View, Text, TextInput } from "react-native";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import CustomModal from "./CustomModal";
import CountdownTimer from "../find/CountdownTimer";
import styles from "../../style/findStyle/FindStyle";
import { useTranslation } from "react-i18next";

function FindPassword() {
  const router = useRouter();
  const { t } = useTranslation();

  const [pwText, setPwText] = useState("");
  const [flag, setFlag] = useState(false);
  const [currentStep, setCurrentStep] = useState("inputEmail");
  const [modalVisible, setModalVisible] = useState(false);
  const [emailholder, setEmailholder] = useState(t("find.emailGuide"));
  const [passwordColor, setPasswordColor] = useState("#FFFFFF");
  const [numberholder, setNumberholder] = useState(t("find.codeGuide"));
  const [end, setEnd] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordHolder, setPasswordHolder] = useState(t("find.weak"));
  const [strengthLevel, setStrengthLevel] = useState(1);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleConfirmPasswordChange = (pw) => {
    setConfirmPassword(pw);
  };

  const handlePasswordChange = (pw) => {
    setPassword(pw);
    const level = getStrengthLevel(pw);
    setStrengthLevel(level);
    const strengthMap = {
      0: { label: t("find.weakest"), color: "#FF0000" },
      1: { label: t("find.weak"), color: "#EE9D28" },
      2: { label: t("find.medium"), color: "#FAE100" },
      3: { label: t("find.strong"), color: "#9ACD32" },
      4: { label: t("find.strongest"), color: "#00BF18" }
    };
    setPasswordHolder(strengthMap[level].label);
    setPasswordColor(strengthMap[level].color);
  };

  const getStrengthLevel = (pw) => {
    if (pw.length === 0) return 0;
    if (pw.length < 3) return 1;
    if (pw.length < 6) return 2;
    if (pw.length < 9) return 3;
    return 4;
  };

  const handleTimerEnd = () => {
    setNumberholder(t("find.codeExpired"));
    setEnd(true);
  };

  const renderInputEmail = () => (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder={t("find.inputEmail")}
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
          <View style={{ flexDirection: "row", alignItems: "center", marginTop: 30 }}>
            <TextInput
              style={styles.numberinput}
              placeholder={t("find.codeGuide")}
              placeholderTextColor="#AEAEAE"
            />
            <Pressable style={styles.confirmButton}>
              <Text style={styles.confirmText}>{t("find.confirm")}</Text>
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
            {flag ? t("find.resetPassword") : t("find.getCode")}
          </Text>
        </Pressable>
      </View>
    </View>
  );

  const renderInputPassword = () => (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder={t("find.newPassword")}
        placeholderTextColor="#AEAEAE"
        secureTextEntry={!passwordVisible}
        value={password}
        onChangeText={handlePasswordChange}
      />
      <Pressable
        style={{ position: "absolute", right: 10, top: 20 }}
        onPress={() => setPasswordVisible(!passwordVisible)}
      >
        <FontAwesome5 name={passwordVisible ? "eye" : "eye-slash"} size={15} color="#F48771" />
      </Pressable>
      <View style={{ flexDirection: "row", marginTop: 10, width: "100%" }}>
        {[...Array(4)].map((_, index) => (
          <View
            key={index}
            style={{
              width: "24%",
              height: 3,
              backgroundColor: index < strengthLevel ? passwordColor : "#606060",
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
          placeholder={t("find.confirmPassword")}
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
        {t("find.matchMessage")}
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
          <Text style={styles.buttonText}>{t("find.resetPassword")}</Text>
        </Pressable>
      </View>
    </View>
  );

  const renderSuccessMessage = () => (
    <View style={{ width: "100%", alignItems: "center", marginTop: 100, flex: 1 }}>
      <Text style={{ color: "white", textAlign: "center", fontSize: 20 }}>
        {t("find.success1")}
      </Text>
      <Text style={{ color: "#0097FB", textAlign: "center", fontSize: 20 }}>
        {t("find.success2")}
      </Text>
      <View style={{ width: "80%", marginTop: "auto" }}>
        <Pressable onPress={() => router.push("/")} style={styles.button}>
          <Text style={styles.buttonText}>{t("find.goToLogin")}</Text>
        </Pressable>
      </View>
    </View>
  );

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
